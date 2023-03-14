import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Container, Input, NativeBaseProvider, Text, TextArea, VStack } from 'native-base';
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
        <Text style={styles.pageTitle}>Help Ticket</Text>

        <VStack space={4} mt={8}>
          <Input
            placeholder="Subject"
            value={ticketSubject}
            onChangeText={setTicketSubject}
            InputLeftElement={<FontAwesome name="tag" size={24} color="black" style={styles.icon} />}
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
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  input: {
    backgroundColor: '#f4f4f4',
    borderRadius: 10,
    borderWidth: 0,
  },
  icon: {
    marginLeft: 10,
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
