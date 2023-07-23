/* eslint-disable react-native/no-inline-styles */
import {View, Alert, StyleSheet, Text} from 'react-native';
import React, {useEffect} from 'react';
// import RNButton from '../../shared/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

interface IUserForm {
  email: string;
  password: string;
}

const defaultValues = {
  email: '',
  password: '',
};

const SignIn = (): JSX.Element => {
  const [userData, setUserData] = useState();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const toast = useToast();

  const methods = useForm<IUserForm>({
    mode: 'all',
    defaultValues,
  });

  const {handleSubmit, control} = methods;

  const signIn = async (formData: IUserForm) => {
    try {
      const data = {...formData};

      let user: string | null = await AsyncStorage.getItem('user');
      if (user) {
        let parsed = JSON.parse(user);
        if (data.email === parsed.email) {
          console.log(
            data.email,
            '   data.email    ',
            parsed.email,
            '   parsed.email   ',
          );
          dispatch(setUserData(parsed));
          toast.show('Logged in successfully', {
            type: 'success',
            placement: 'top',
            duration: 4000,
            animationType: 'slide-in',
          });
          navigation.navigate(EPath.HOME as never);
        } else {
          console.log(
            data.email,
            '   data.email    ',
            parsed.email,
            '   parsed.emailf   ',
          );
        }
      } else {
        toast.show('There is no such user. Please register', {
          type: 'danger',
          placement: 'top',
          duration: 4000,
          animationType: 'slide-in',
        });
      }
    } catch (error: any) {
      Alert.alert(error);
    }
  };

  const signinHandler = async (formData: IUserForm) => {
    const data = {...formData};

    const api = create({
      baseURL: 'https://lzone.secret-agents.ru',
      // headers: { Accept: 'application/vnd.github.v3+json' },
    })

    const abo = api.post('/api/v2/auth/sign_in', { email: 'bullet2271293@gmail.com', password: 'beta1234' })
    console.log(abo, 'aboaas')
    dispatch(setUserData(abo));
          toast.show('Logged in successfully', {
            type: 'success',
            placement: 'top',
            duration: 4000,
            animationType: 'slide-in',
          });
          navigation.navigate(EPath.HOME as never);
  };

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
