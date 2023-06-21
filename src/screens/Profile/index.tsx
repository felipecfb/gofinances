import React from 'react';
import { Button } from 'react-native';
import { TextInput } from 'react-native';
import { Text, View } from 'react-native';

export function Profile() {
  return (
    <View>
      <Text testID="text-title">
        Perfil
      </Text>

      <TextInput
        testID="input-name"
        placeholder="Nome"
        autoCorrect={false}
        value="Rodrigo"
      />

      <TextInput
        testID="input-surname"
        placeholder="Sobrenome"
        value="Gonçalves"
      />

      <Button
        title="Salvar"
        onPress={() => {}}
      />
    </View>
  );
}