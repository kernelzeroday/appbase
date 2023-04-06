import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Container, Input, NativeBaseProvider, Text, TextArea, VStack, View } from 'native-base';
import { FontAwesome } from '@expo/vector-icons';

export default function HelpTicketScreen() {
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketDetails, setTicketDetails] = useState('');

  const handleCreateTicket = () => {
    // Handle create ticket logic here
  };

  return (
    <NativeBaseProvider>
      <Container style={styles.container}>
      <View style={styles.header}>
          <Text style={styles.headerText}>Application Support Request</Text>
        </View>

        <VStack space={4} mt={8}>
          <Input
            placeholder="Subject"
            value={ticketSubject}
            onChangeText={setTicketSubject}
            style={styles.input}
          />

          <TextArea
                      placeholder="Describe your issue here"
                      value={ticketDetails}
                      onChangeText={setTicketDetails}
                      h={120}
                      style={styles.input} autoCompleteType={undefined}          />

          <Button style={styles.createButton} onPress={handleCreateTicket}>
            <Text style={styles.createButtonText}>Create Ticket</Text>
          </Button>
        </VStack>
      </Container>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'black',
    paddingHorizontal: 20,
    marginLeft: 200,
  },
  header: {
    marginTop: 20,
    width: "100%",
    height: 100,
    backgroundColor: "#121212",
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 20,
    justifyContent: 'center',
    color: 'white',
  },
  input: {
    backgroundColor: '#f4f4f4',
    borderWidth: 0,
  },
  createButton: {
    backgroundColor: '#1B4F72',
    borderRadius: 10,
    alignSelf: 'center',
  },
  createButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
