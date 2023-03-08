import * as React from 'react';
import { ApiService } from '../../lib/axios';
import { useToast } from 'native-base';
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
  Select,
  CheckIcon,
} from 'native-base';

// navigation
import { RootStackParamList } from '../../navigation/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<RootStackParamList, 'Signup'>;

export const SignupScreen: React.FC<Props> = (props) => {
  const toast = useToast();
  const [email, onChangeEmail] = React.useState('');
  const [first_name, onChangeFirstName] = React.useState('');
  const [last_name, onChangeLastName] = React.useState('');
  const [password, onChangePassword] = React.useState('');
  const [user_timezone, onSetTimezone] = React.useState('');
  const onPressSignup = async () => {
    const values = {
      email,
      password,
      first_name,
      last_name,
    };
    ApiService.signup(values).then(() => {
      toast.show({
        description: 'Signed in successfully',
      });
      setTimeout(() => {
        props.navigation.navigate('Signin');
      }, 1000);
    });
  };
  const onPressSigninLink = async () => {
    props.navigation.navigate('Signin');
  };
  return (
    <Center width="100%">
      <Box safeArea p="2" py="8" w="90%">
        <Heading>Register your account</Heading>
        <Column space={3} mt="5">
          <FormControl>
            <FormControl.Label>Email</FormControl.Label>
            <Input value={email} onChangeText={onChangeEmail} type="text" />
          </FormControl>
          <FormControl>
            <FormControl.Label>First Name</FormControl.Label>
            <Input value={first_name} onChangeText={onChangeFirstName} />
          </FormControl>
          <FormControl>
            <FormControl.Label>Last Name</FormControl.Label>
            <Input value={last_name} onChangeText={onChangeLastName} />
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input
              value={password}
              onChangeText={onChangePassword}
              type="password"
            />
          </FormControl>
          {/*Timezone*/} 
            <FormControl.Label>Timezone</FormControl.Label>
            <Select
              selectedValue={user_timezone}
              minWidth={200}
              accessibilityLabel="Select your timezone"
              placeholder="Select your timezone"
              onValueChange={(itemValue) => onSetTimezone(itemValue)}
              _selectedItem={{
                bg: 'cyan.600',
                endIcon: <CheckIcon size={4} />,
              }}
            >
              <Select.Item label="America/New_York" value="America/New_York" />
              <Select.Item label="America/Chicago" value="America/Chicago" />
              <Select.Item label="America/Denver" value="America/Denver" />
              <Select.Item label="America/Los_Angeles" value="America/Los_Angeles" />
              <Select.Item label="America/Anchorage" value="America/Anchorage" />
              <Select.Item label="America/Phoenix" value="America/Phoenix" />
              <Select.Item label="America/Adak" value="America/Adak" />
              <Select.Item label="Pacific/Honolulu" value="Pacific/Honolulu" />
              <Select.Item label="Asia/Tokyo" value="Asia/Tokyo" />
              <Select.Item label="Asia/Seoul" value="Asia/Seoul" />
              <Select.Item label="Asia/Shanghai" value="Asia/Shanghai" />
              <Select.Item label="Asia/Hong_Kong" value="Asia/Hong_Kong" />
              <Select.Item label="Asia/Taipei" value="Asia/Taipei" />

            </Select>
            
            
          <Button onPress={onPressSignup} mt="2">
            Sign up
          </Button>
          <Row mt="6" justifyContent="center">
            <Text>Already have a account? </Text>
            <Link onPress={onPressSigninLink}>Sign in</Link>
          </Row>
        </Column>
      </Box>
    </Center>
  );
};
