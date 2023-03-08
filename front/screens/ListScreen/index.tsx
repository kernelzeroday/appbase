import React, { useCallback, useState } from 'react';
import {
  Box,
  FlatList,
  Row,
  Column,
  Text,
  Pressable,
  Center,
  Icon,
  Heading,
  Spacer,
  Button,
} from 'native-base';


// navigation
import { RootStackParamList } from '../../navigation/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';
import { ApiService, UserModel, apiClient } from '../../lib/axios';
import Feather from '@expo/vector-icons/build/Feather';

type Props = NativeStackScreenProps<RootStackParamList, 'List'>;

export const ListScreen: React.FC<Props> = () => {
  const [lists, setLists] = useState<UserModel[]>();
  const [timesheet, setTimesheet] = useState<UserModel[]>();
  const onPressClockInButton = async () => {
    ApiService.clockIn().then((e) => {
      console.log(e);
    });
  };
  const onPressClockOutButton = async () => {
    ApiService.clockOut().then((e) => {
      console.log(e); 
    });
  };

  const onPressTimesheetRefreshButton = async () => {
    ApiService.getTimesheet().then((e) => {
      console.log(e);
      
    });
  }


  const onPressListItem = async (item: UserModel) => {
    // TODO: do something
    // props.navigation.navigate('Detail', {
    //   screen: 'Profile',
    //   params: item,
    // });
    console.log(item);
  };
  const GetUsers = () => {
    ApiService.getUsers().then((e) => {
      console.log(e);
      setLists(e.data);
    });
  };

  useFocusEffect(
    useCallback(() => {
      // Do something when the screen is focused
      GetUsers();
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );
  return (
    <Center width="100%">
      <Box w="100%">
        <Box
          borderBottomWidth="1"
          _light={{
            borderColor: 'light.border',
          }}
          _dark={{
            borderColor: 'dark.border',
          }}
          pl="4"
          pr="5"
          py="2"
        >
          <Row space={3} justifyContent="space-between">
            <Column mr={1}>
              <Row>
                <Column justifyContent="center">
                  {/* use icon for message instead of user icon */}
                  <Icon

                    as={Feather}
                    color="emerald.500"
                    name="info"
                    size="sm"
                    mr={3}
                  />

                </Column>
                <Column>
                  <Heading fontSize="sm">
                    Name: Royal Administration Time Portal
                  </Heading>
                  <Text fontSize="xs">
                  Welcome to our Time Portal Application, designed to make tracking your time and attendance simple and easy. 

                    </Text>
                </Column>
              </Row>
            </Column>
          </Row>
        </Box>
        <FlatList
          data={lists}
          renderItem={({ item }) => (
            <Pressable onPress={() => onPressListItem(item)}>
              <Box
                borderBottomWidth="1"
                _light={{
                  borderColor: 'light.border',
                }}
                _dark={{
                  borderColor: 'dark.border',
                }}
                pl="4"
                pr="5"
                py="2"
              >
                <Row space={3} justifyContent="space-between">
                  <Column mr={1}>
                    <Row>
                      <Column justifyContent="center">
                        <Icon
                          as={Feather}
                          color="emerald.500"
                          name="user"
                          size="sm"
                          mr={3}
                        />
                      </Column>
                      <Column>
                        <Heading fontSize="sm">
                          Name: {item.first_name + ' ' + item.last_name}
                        </Heading>
                        <Text fontSize="xs">Email {item.email}</Text>
                      </Column>
                    </Row>
                  </Column>
                </Row>
              </Box>
            </Pressable>
          )}
          keyExtractor={(item) => String(item.email)}
        />
      </Box>
      {/* time punch area */}
      <Box
        borderBottomWidth="1"
        _light={{
          borderColor: 'light.border',
        }}
        _dark={{
          borderColor: 'dark.border',
        }}
        pl="4"
        pr="5"
        py="2"
      >
        <Row space={3} justifyContent="space-between">
          <Column mr={1}>
            <Row>
              <Column justifyContent="center">
                {/* use icon for message instead of user icon */}
                <Icon
                  as={Feather}
                  color="emerald.500"
                  name="clock"
                  size="sm"
                  mr={3}
                />
              </Column>
              <Column>
              {/* punch in button */}
              <Pressable
                onPress={onPressClockInButton}
                bg="emerald.500"
                rounded="md"
                _pressed={{
                  bg: 'emerald.600',
                }}
                px={4}
                py={2}

              >              
                <Text fontSize="sm">Punch In</Text>
              </Pressable>
              <Spacer>    </Spacer>
              {/* punch out button */}
              <Pressable
                onPress={onPressClockOutButton}
                bg="emerald.500"
                rounded="md"
                _pressed={{
                  bg: 'emerald.600',
                }}
                px={4}
                py={2}
              >
                <div></div>
                <Text fontSize="sm">Punch Out</Text>
              </Pressable>


              </Column>
            </Row>
          </Column>
        </Row>
      </Box>

      {/* time sheet table area with dates and totals */}
      <Box
        borderBottomWidth="1"
        _light={{
          borderColor: 'light.border',
        }}
        _dark={{
          borderColor: 'dark.border',
        }}
        pl="4"
        pr="5"
        py="2"
      >
        <Row space={3} justifyContent="space-between">
          <Column mr={1}>
            <Row>
              <Column justifyContent="center">
                {/* use icon for message instead of user icon */}
                <Icon
                  as={Feather}
                  color="emerald.500"
                  name="clock"
                  size="sm"
                  mr={3}
                />
              </Column>
              <Column>
              {/* date table */}
              <Box
        borderBottomWidth="1"
        _light={{
          borderColor: 'light.border',
        }}
        _dark={{
          borderColor: 'dark.border',
        }}
        pl="4"
        pr="5"
        py="2"
      >
        <Row space={3} justifyContent="space-between">
          <Column mr={1}>
            <Row>
              <Column justifyContent="center">
                <table
                  style={{
                    borderCollapse: 'collapse',
                    width: '100%',
                  }}
                >
                  <tr>
                    <th>Monday</th>
                    <th>Tuesday</th>
                    <th>Wednesday</th>
                    <th>Thursday</th>
                    <th>Friday</th>
                    <th>Saturday</th>
                    <th>Sunday</th>
                  </tr>
                  <tr>
                    <td>8:00am</td>
                    <td>8:00am</td>
                    <td>8:00am</td>
                    <td>8:00am</td>
                    <td>8:00am</td>
                    <td>8:00am</td>
                    <td>8:00am</td>
                  </tr>
                  <tr>
                    <td>5:00pm</td>
                    <td>5:00pm</td>
                    <td>5:00pm</td>
                    <td>5:00pm</td>
                    <td>5:00pm</td>
                    <td>5:00pm</td>
                    <td>5:00pm</td>
                  </tr>
                </table>
              </Column>
            </Row>
          </Column>
        </Row>
      </Box>
              </Column>
            </Row>
          </Column>
        </Row>
      </Box>
      

    </Center>
  );
};
