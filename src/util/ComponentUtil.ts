import React, { ReactElement } from 'react'

/**
 * NOTE: This code is provided as-is, and should not be changed for the purpose of this
 *       tutorial.
 */

export class ComponentUtil {

    static cloneWithMoreProps = (component:ReactElement<any>, props:object) => {
        return React.cloneElement(component, props);
    }

    static cloneWithMoreStyles = (component:ReactElement<any>, style:object|Array<any>|number) => {
        return React.cloneElement(component, { style } )
    }

}