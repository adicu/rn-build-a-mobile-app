import {
    Dimensions,
    Platform,
    PixelRatio,
} from 'react-native';
const { width } = Dimensions.get('window')
import { getStatusBarHeight } from 'react-native-status-bar-height'

// Dimension constants
const GUIDELINE_BASE_WIDTH = 414
const GUIDELINE_BASE_HEIGHT = 736

/**
 * NOTE: This code is provided as-is, and should not be changed for the purpose of this
 *       tutorial.
 */

export class DeviceUtil {

    // isiPhoneX:Boolean
    // returns A boolean indicating whether the window is that of an iPhone X.
    static isiPhoneX():boolean {
        let { height, width } = Dimensions.get('window');
        return Platform.OS === 'ios' && (width === 812 || height === 812);
    }

    static scale(size:number) {
        return PixelRatio.roundToNearestPixel((width / GUIDELINE_BASE_WIDTH) * size)
    }

    static scaleFont(size:number) {
        return width < 375
        ? PixelRatio.roundToNearestPixel(size * 0.8)
        : PixelRatio.roundToNearestPixel(size)
    }

    static deviceWidth() {
        return Dimensions.get('window').width
    }

    static deviceHeight() {
        return Dimensions.get('window').height
    }

    static statusBarHeight() {
        return DeviceUtil.scale(getStatusBarHeight());
    }

    // Returns the first argument if the user is on an iPhone. Otherwise, return the second argument (if android).
    static ifiPhoneElseAndroid(somethingIfiPhone:any, somethingElseIfAndroid:any):any {
        return Platform.OS === 'ios' ? somethingIfiPhone : somethingElseIfAndroid;
    }

}