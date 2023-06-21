import React from 'react';
import { Button } from 'react-native';
import { TextInput } from 'react-native';
import { Text, View } from 'react-native';

export function Profile() {
  return (
    <View>
      <Text>
        Perfil
      </Text>

      <TextInput
        placeholder="Nome"
        autoCorrect={false}
      />

      <TextInput
        placeholder="Sobrenome"
      />

      <Button
        title="Salvar"
        onPress={() => {}}
      />
    </View>
  );
}