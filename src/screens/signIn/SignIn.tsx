/* eslint-disable react-native/no-inline-styles */
import {View, Alert, StyleSheet, Text} from 'react-native';
import React, {useState} from 'react';
// import RNButton from '../../shared/Button';
import TextInputField from '../../shared/TextInput';
import {
  emailValidation,
  inputMaxLengthLimit,
  inputMinLengthLimit,
  requiredField,
} from '../../shared/validation/Validation';
import {FormProvider, useForm} from 'react-hook-form';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {setUserData} from '../../redux/slicers/loginSlice';
// import {IRegisterUser} from '../../shared/models/interfaces/user.interface';
import {IconButton} from 'react-native-paper';
import {EPath} from '../../shared/models/enums/path.enum';
import {useToast} from 'react-native-toast-notifications';
import RNButton from '../../shared/Button';
import { create } from 'apisauce'
import AsyncStorage from '@react-native-async-storage/async-storage';

// Function to check if the user is logged in
export const isAuthenticated = async () => {
  try {
    const token = await AsyncStorage.getItem('authorization');
    return token !== null;
  } catch (error) {
    console.error('Error while checking authentication status:', error);
    return false;
  }
};
interface IUserForm {
  email: string;
  password: string;
}

const defaultValues = {
  email: '',
  password: '',
};

const SignIn = (): JSX.Element => {
  const [userData, setUserData] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const toast = useToast();

  const methods = useForm<IUserForm>({
    mode: 'all',
    defaultValues,
  });

  const {handleSubmit, control} = methods;

  const api = create({
    baseURL: 'https://lzone.secret-agents.ru/api/v2/auth',
  });
  
  // Function to perform the login request
  const loginUser = async (data) => {
      const formData = {
      email: data.email.trim(),
      password: data.password.trim(),
    };
   
    try {
      // Make the API request to the sign_in endpoint
      const response = await api.post('/sign_in', formData);

     console.log(formData,'aaaa')
      // console.log(response.token,'baaa')
      // console.log(response,'caaa')
      if (!response.ok) {
        // Login successful, return the user data
        console.log('FIL')
        return { success: false, errors: response.errors };
      } else {
        // Login failed, handle the error
        console.log('SUCCESS')
          AsyncStorage.setItem('authorization', response.headers.authorization );
          return {response: response.data, success: true};
      }
    } catch (error) {
      // Handle any network or other errors
      return { success: false, errors: ['An error occurred. Please try again.'] };
    }
  };
  const signinHandler = (data) => {
    loginUser(data) 
  .then((userData) => {
    console.log(userData,'aaa')
    if (!userData.success) {
      
      console.log('NOT SUCC')
      // Login failed, handle the errors
      console.error('Login failed with errors:', userData.errors);
    } else {
      console.log('SCS')
      // Login successful, use the userData object
      
      setUserData(userData.response)
      navigation.replace(EPath.HOME as never); 
      console.log('Logged in user data:', userData);
      
    }
  })
  .catch((error) => {
    // Handle any unexpected errors
    console.error('Unexpected error occurred:', error);
  });
  }
  
  // Usage example:
  const email = 'bullet2271293@gmail.com';
  const password = 'beta1234';
  console.log(userData,'DAT ')

  return (
    <View style={{backgroundColor: 'white', height: '100%'}}>
      <View style={{marginHorizontal: 17}}>
        <View style={{height: '82%'}}>
          <View style={{marginBottom: 35}}>
            <Text style={styles.text}>Log In to Your Informed Today Account</Text>
          </View>
          <View>
            <FormProvider {...methods}>
              <TextInputField
                placeholder="Email"
                name="email"
                labelIsVisible
                secureTextEntry
                control={control}
                rules={{
                  required: requiredField(),
                  pattern: emailValidation(),
                }}
                props={{maxLength: 100}}
                customInputStyles={styles.input}
              />
              <TextInputField
                placeholder="Password"
                name="password"
                labelIsVisible
                secureTextEntry
                control={control}
                isPassword
                rules={{
                  required: requiredField(),
                  minLength: inputMinLengthLimit(8),
                  maxLength: inputMaxLengthLimit(13),
                }}
                customInputStyles={styles.input}
                customPasswordStyles={styles.passwordIcon}
              />
              <RNButton
                title="Sign In"
                onPress={handleSubmit(signinHandler)}
                buttonStyle={styles.button}
                textStyle={styles.btnText}
              />
            </FormProvider>
          </View>

          
        </View>
       
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    width: '100%',
    height: 35,
    marginTop: 35,
    borderStyle: 'solid',
    marginBottom: 5,
  },
  btnText: {
    color: 'white',
  },
  text: {
    fontSize: 20,
    marginTop: 15,

  },
  input: {
    marginBottom: 30,
    width: '100%',
    borderBottomWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    paddingLeft: 15,
  },
  passwordIcon: {
    position: 'absolute',
    right: 20,
    top: 100,
  },
});

export default SignIn;
