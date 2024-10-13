import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AppointmentScreen from '../AppointmentScreen/AppointmentScreen';
import AppointmentInfo from '../AppointmentScreen/AppointmentInfo';

const Consultation = createNativeStackNavigator();

export default function ConsultationStack({navigation}) {
  return (
    <Consultation.Navigator>
      <Consultation.Screen
        name="Consultation"
        component={AppointmentScreen}
        options={{headerShown: false}}
      />
      <Consultation.Screen
        name="ConsultationInfo"
        component={AppointmentInfo}
        options={{headerShown: false}}
      />
    </Consultation.Navigator>
  );
}
