import React, { Component, ReactNode } from 'react'
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native'
import MapView, { Region, MapEvent, LatLng, Marker } from 'react-native-maps'
import DialogInput from 'react-native-dialog-input'

import { NavigationBar } from '../components'
import { colors } from '../constants'
import { DeviceUtil, StorageUtil } from '../util'
import { StudyZone } from '../interfaces'

// Constants
const DISTANCE_DELTA = 0.006
const STUDY_ZONE_KEY = 'studyZones'

export class MainScreen extends Component {

    public render = ():ReactNode => {
        return (
            null
        )
    }

}

/**
 * Sub-Components
 */

// Navigational bar
const MainNavigationBar = () => (
    null
)

/**
 * Styles
 */

const styles = StyleSheet.create({
    
})