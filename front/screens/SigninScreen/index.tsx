import * as React from 'react';

// api
import { apiClient, ApiService } from '../../lib/axios';

//components
import {
  Box,
  Text,
  Heading,
  Column,
  FormControl,
  Input,
  Link,
  Button,
  Row,
  Center,
  Checkbox,
  Spacer,
  Icon,
} from 'native-base';

//redux
import { useDispatch, useSelector } from 'react-redux';
import {
  setUser,
  setToken,
  setLoginEmail,
} from '../../lib/redux/reducers/authReducer';
import { RootState } from '../../lib/redux/store';

// navigation
import { RootStackParamList } from '../../navigation/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<RootStackParamList, 'Signin'>;

export const SigninScreen: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const { loginInfo } = useSelector((state: RootState) => state.auth);
  const [email, onChangeEmail] = React.useState(loginInfo?.email);
  const [password, onChangePassword] = React.useState(loginInfo?.password);
  const [rememberMe, setRememberMe] = React.useState(!!loginInfo?.email);
  const onPressSigninButton = async () => {
    const values = {
      email,
      password,
    };
    ApiService.signin(values).then((res) => {
      console.log(res);
      dispatch(setUser(res.data.user));
      dispatch(setToken(res.data.token));
      // Set auth token
      apiClient.interceptors.request.use((config) => {
        if (config.headers) {
          config.headers.Authorization = `Bearer ${res.data.token.access_token}`;
        }
        return config;
      });
      // If remember me checked, then save user data to storage
      if (rememberMe) {
        dispatch(
          setLoginEmail({
            email: email,
            password: password,
          })
        );
      }
      props.navigation.navigate('List');
    });
  };
  const onPressSignupLink = () => {
    props.navigation.navigate('Signup');
  };
  return (
    <Center width="100%">
      <Box safeArea p="2" py="8" w="90%">
        <Heading>Royal Admin TimePortal</Heading>
        <Column space={3} mt="5">
          <Text fontSize="sm" color="muted.700">Please be advised that the following information is sensitive and confidential and is intended only for authorized personnel with a legitimate business need to access such information. Unauthorized access or disclosure of this information is strictly prohibited and may result in legal action.
          </Text>
          <FormControl>
            <FormControl.Label>Email</FormControl.Label>
            <Input value={email} onChangeText={onChangeEmail} type="text" />
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input
              value={password}
              onChangeText={onChangePassword}
              type="password"
            />
          </FormControl>
          <Row space={3} width="100%">
            <Checkbox value="" isChecked={rememberMe} onChange={setRememberMe}>
              Remember me
            </Checkbox>
            <Spacer />
            <Link href={'https://your.app.web/forgot-password'} isExternal>
              Forget Password?
            </Link>
          </Row>
          <Button onPress={onPressSigninButton} mt="2">
            Sign in
          </Button>
          <Row mt="6" justifyContent="center">
            <Text>I&apos;m a new user. </Text>
            <Link onPress={onPressSignupLink}>Sign Up</Link>
          </Row>
          <Row mt="6" justifyContent="center">
            <Text>By signing in, you agree to our </Text>
            <Link href={'https://your.app.web/terms'} isExternal>
              Terms of Service
            </Link>
            <Text> and </Text>
            <Link href={'https://your.app.web/privacy'} isExternal>
              Privacy Policy
            </Link>
          </Row>
          <Text fontSize="xs" color="muted.700" mt="6">
          If you have questions or concerns regarding the sensitive data in this restricted area, please contact your direct supervisor or our help desk for assistance. It is important to ensure that any questions or issues related to this data are addressed through the proper channels to maintain the confidentiality and security of the information.
          If you are experiencing issues with accessing or using this system, please contact the site administrator or your direct employment supervisor for assistance. They will be able to troubleshoot the issue and help you get back on track. It is important to address any technical issues promptly to ensure that you are able to access and use the system effectively.
          Our non-disclosure policy is in place to protect the confidentiality of sensitive information and ensure reasonable use of such information. We ask that all authorized personnel handle this information with fairness and respect the rights of all parties involved. It is important to be aware that any cryptic or vague warnings regarding this information may be insufficient to fully convey the seriousness of the situation, and we encourage all employees to seek guidance from their supervisors or legal advisors as needed.
          </Text>
          <Text fontSize="xs" color="muted.700" mt="6">
            Property of copyright 2023-2027 Royal Admin TimePortal
          </Text>
          <Text fontSize="xs" color="muted.700" mt="6">
          Please be advised that this is not a government system and is not monitored as such. Any information or data transmitted through this system should not be considered secure or confidential. We encourage all users to take appropriate measures to safeguard sensitive information and exercise caution when sharing any personal or confidential data through this system.
          </Text>

        </Column>
      </Box>
    </Center>
  );
};
