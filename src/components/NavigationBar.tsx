import React, { Component, ReactElement, ReactNode } from 'react'
import * as t from 'prop-types'
import {
      StyleSheet,
      View,
      StatusBar,
} from 'react-native'

import { ComponentUtil } from '../util'
import { DeviceUtil } from '../util/DeviceUtil';
import { colors } from '../constants/colors';

/**
 * NOTE: This code is provided as-is, and should not be changed for the purpose of this
 *       tutorial.
 */

export class NavigationBar extends Component {

    public render():ReactNode {

        let { leftContent = [], centerContent = [], rightContent = [], style = {}, spacing = 0 } = this.props as any

        return (
            <View style={styles.outerContainer}>
                <StatusBar
                    barStyle={'light-content'}
                    translucent={true}
                />
                <View style={[styles.innerContainer, style]}>
                    <View style={styles.left} children={leftContent.map((content:ReactElement<any>, i:number) => {
                            return ComponentUtil.cloneWithMoreStyles(content, { key: `L${i}`, marginRight: spacing })
                    })}></View>
                    <View style={styles.center} children={centerContent.map((content:ReactElement<any>, i:number) => {
                            return ComponentUtil.cloneWithMoreStyles(content, { key: `C${i}`, paddingLeft: spacing / 2, paddingRight: spacing / 2 })
                    })}></View>
                    <View style={styles.right} children={rightContent.map((content:ReactElement<any>, i:number) => {
                            return ComponentUtil.cloneWithMoreStyles(content, { key: `R${i}`, marginLeft: spacing })
                    })}></View>
                </View>
            </View>
        )
    }

      static propTypes = {
            /** Components displayed on the left side. */
            leftContent: t.arrayOf(t.node),
            /** Components displayed in the center. */
            centerContent: t.arrayOf(t.node),
            /** Components displayed on the right side. */
            rightContent: t.arrayOf(t.node),
            /** Style of the container.. */
            style: t.oneOfType([t.array, t.object, t.number]),
            /** Spacing between each item. */
            spacing: t.number,
      }

      static defaultProps = {
            leftContent: [],
            centerContent: [],
            rightContent: [],
            style: {},
            spacing: 0,
      }

}

/* Styling */
const styles = StyleSheet.create({
    outerContainer: {
        zIndex: 1,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 6,
        elevation: 1,
        shadowColor: colors.dark,
    },
    innerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: DeviceUtil.statusBarHeight() + DeviceUtil.scale(10),
        paddingBottom: DeviceUtil.scale(10),
    },
    left: {
        flex: 0.3,
        textAlign: 'left',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    center: {
        flex: 0.4,
        textAlign: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    right: {
        flex: 0.3,
        textAlign: 'right',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },
});
