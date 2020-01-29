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

    public state = {
        region: {
            latitude: 40.807411,
            longitude: -73.962123,
            latitudeDelta: DISTANCE_DELTA,
            longitudeDelta: DISTANCE_DELTA,
        } as Region,
        studyZones: [] as StudyZone[],
        studyZoneLocation: null as LatLng,
        isDialogOpen: false as boolean,
    }

    public componentDidMount = () => {
        // Load study zones from storage after the screen loads
        StorageUtil.get(STUDY_ZONE_KEY).then((studyZones:StudyZone[]|null) => {
            if (!studyZones) {
                studyZones = []
                StorageUtil.set(STUDY_ZONE_KEY, studyZones)
            }
            this.setState({ studyZones })
        })
    }

    public render = ():ReactNode => {
        return (
            <View>
                <MainNavigationBar />
                {
                    this.state.studyZones.length > 0 &&
                    <TouchableOpacity style={styles.deleteButton} onPress={this.deleteStudyZones}>
                        <Text style={styles.deleteButtonText}>
                            Delete All Study Zones
                        </Text>
                    </TouchableOpacity>
                }
                <MapView
                    style={styles.map}
                    region={this.state.region}
                    onDoublePress={this.promptCreateStudyZone}
                    mapType={'hybrid'}
                    showsUserLocation={true}
                    loadingEnabled={true}
                    showsPointsOfInterest={false}
                    loadingBackgroundColor={colors.secondary}
                    loadingIndicatorColor={colors.light}
                >
                    {this.state.studyZones.map((studyZone:StudyZone, index:number) => (
                        <Marker
                            key={index}
                            coordinate={studyZone.location}
                            title={studyZone.name}
                        />
                    ))}
                </MapView>
                <DialogInput isDialogVisible={this.state.isDialogOpen}
                    title={"New Study Zone"}
                    message={"Type a name for your new study zone."}
                    hintInput ={"Butler"}
                    submitInput={this.createStudyZone}
                    closeDialog={() => { this.toggleDialog(false) }}>
                </DialogInput>
            </View>
        )
    }

    private promptCreateStudyZone = (event:MapEvent):void => {
        const coordinate:LatLng = event.nativeEvent.coordinate
        this.setState({ studyZoneLocation: coordinate })
        this.toggleDialog(true)
    }

    private createStudyZone = (name:string):void => {
        const newStudyZone = {
            name,
            location: this.state.studyZoneLocation
        }
        const studyZones = this.state.studyZones.concat([ newStudyZone ])
        this.setState({ studyZones })
        this.toggleDialog(false)
        StorageUtil.set(STUDY_ZONE_KEY, studyZones)
    }

    private toggleDialog = (isDialogOpen:boolean):void => {
        this.setState({ isDialogOpen })
    }

    private deleteStudyZones =() => {
        StorageUtil.remove(STUDY_ZONE_KEY)
        this.setState({ studyZones: [] })
    }

}

/**
 * Sub-Components
 */

// Navigational bar
const MainNavigationBar = () => (
    <NavigationBar
        style={styles.navigationBar}
        centerContent={[
            <View key={0}>
                <Text style={styles.navigationBarText}>
                    STUDY BUDDY
                </Text>
            </View>
        ]}
    />
)

/**
 * Styles
 */

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    navigationBar: {
        backgroundColor: colors.quaternary,
    },
    navigationBarText: {
        color: colors.light,
        fontWeight: '900',
        textAlign: 'center',
        fontSize: DeviceUtil.scaleFont(18),
    },
    map: {
        width: DeviceUtil.deviceWidth(),
        height: DeviceUtil.deviceHeight(),
    },
    deleteButton: {
        zIndex: 1,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.primary,

        top: DeviceUtil.statusBarHeight() + DeviceUtil.scale(60),
        left: DeviceUtil.scale(30),
        right: DeviceUtil.scale(30),

        padding: DeviceUtil.scale(12),
    },
    deleteButtonText: {
        color: colors.light,
        fontWeight: '900',
        textAlign: 'center',
        fontSize: DeviceUtil.scaleFont(18),
    }
})