import * as React from 'react';
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import colors from '../colors';

export default function GoToButton({ screenName , title, data }) {
    const navigation = useNavigation();
    return (
      <Button
        color={colors.red}
        title={title}
        onPress={() => navigation.navigate(screenName,{data})}
      />
    );
  }