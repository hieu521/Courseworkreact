import React from 'react';
import {createStackNavigator,TransitionPresets} from '@react-navigation/stack';

import HikingScreen from '../../features/hiking/screens/hiking.screen';
import ObservationScreen from '../../features/observation/screens/observation.screen';

const HikingStack = createStackNavigator();

export const HikingNavigator = () => {

    return (
        <HikingStack.Navigator
            screenOptions={{
                headerShown: false,
               ...TransitionPresets.ModalPresentationIOS,
            }}
        >
            <HikingStack.Screen name="Hikings" component={HikingScreen} />
            <HikingStack.Screen name="Observation" component={ObservationScreen} />
        </HikingStack.Navigator>
    );



}