import React, {useState} from 'react';
import {Button, SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import {Field, Formik} from "formik";
import CustomInput from "../components/CustomInput";
import {useNavigation} from '@react-navigation/native';
import AuthService from "../services/authService";
import * as yup from 'yup';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (userFormValues) => {
    setErrorMessage('');
    try {
      await AuthService.login(userFormValues);
      navigation.navigate('Home');
    } catch (error) {
      // console.error('Erro no login:', error.message);
      setErrorMessage('Erro no login: ' + error.message);
    }
  };

  const handleFieldChange = (name, handleChange) => {
    return (value) => {
      handleChange(name)(value);
      setErrorMessage('');
    };
  };
  return (
    <>
      <StatusBar barStyle="dark-content"/>
      <SafeAreaView style={styles.container}>
        <View style={styles.signupContainer}>

          <Text style={styles.title}>Login</Text>
          <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={handleLogin}
            validateOnBlur={false}
            validateOnChange={true}
            validationSchema={yup.object().shape({
              email: yup.string().email('Insira um e-mail válido').required('O campo de e-mail é obrigatório'),
              password: yup.string().required('O campo de senha é obrigatório'),
            })}
          >
            {({ handleSubmit, isValid, values, errors, touched }) => (
              <>
                <Field
                  component={CustomInput}
                  name="email"
                  placeholder="Email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                {/*{errors.email && touched.email && <Text style={styles.error}>{errors.email}</Text>}*/}

                <Field
                  component={CustomInput}
                  name="password"
                  placeholder="Password"
                  autoCapitalize="none"
                  secureTextEntry
                />
                {/*{errors.password && touched.password && <Text style={styles.error}>{errors.password}</Text>}*/}

                {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

                <View style={styles.buttonSubmit}>
                  <Button
                    onPress={handleSubmit}
                    title="Login"
                    // style={styles.buttonSubmit}
                    disabled={!isValid}
                  />
                </View>
              </>
            )}
          </Formik>
        </View>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupContainer: {
    width: '80%',
    alignItems: 'center',
    padding: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonSubmit: {
    // marginTop: 20,
    paddingTop: 20,
    width: '50%',
  },
  error: {
    color: 'red',
    marginVertical: 20,
    fontSize: 15,
  },
})

export default LoginScreen;
