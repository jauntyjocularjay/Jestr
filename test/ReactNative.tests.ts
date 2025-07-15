import React from 'react'
import RNativeApp from '../example/ReactNative'
import { expects } from '../Jestr'


describe('React Native tests', () => {
    expects.toBe.defined('RNativeApp.length', RNativeApp.length)
})