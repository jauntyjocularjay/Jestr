import {
    SubjectTargetAre,
    SubjectTargetSuitabilityError,
    TargetSuitabilityError,
    IntegerFloatMismatchError,
    StubError,
    expects
} from './Jestr'
import {
    getCounter,
    throwsAnError,
    contains,
    defined,
    did,
    does,
    have,
    has,
    is,
    matches,
    recognizes
} from './module/verbs/Verbs'

const prop =
{
    special: 
    {
        children: 'children',
        dangerouslySetInnerHTML: 'dangerouslySetInnerHTML',
        ref: 'ref',
        suppressContentEditableWarning: 'suppressContentEditableWarning',
        suppressHydrationWarning: 'suppressHydrationWarning',
        style: 'style'
    },
    common: 
    {
        accessKey: 'accessKey',
        autoCapitalize: 'autoCapitalize',
        className: 'className',
        contentEditable: 'contentEditable',
        data: 'data-',
        dir: 'dir',
        draggable: 'draggable',
        enterKeyHint: 'enterKeyHint',
        htmlFor: 'htmlFor',
        hidden: 'hidden',
        id: 'id',
        is: 'is',
        inputMode: 'inputeMode',
        itemProp: 'itemProp',
        lang: 'lang',
        onAnimationEnd: 'onAnimationEnd',
        onAnimationEndCapture: 'onAnimationEndCapture',
        onAnimationIteration: 'onAnimationIteration',
        onAnimationIterationCapture: 'onAnimationIterationCapture',
        onAnimationStart: 'onAnimationStart',
        onAnimationStartCapture: 'onAnimationStartCapture',
        onAuxClick: 'onAuxClick',
        onAuxClickCapture: 'onAuxClickCapture',
        onBeforeInput: 'onBeforeInput',
        onBeforeInputCapture: 'onBeforeInputCapture',
        onBlur: 'onBlur',
        onBlurCapture: 'onBlurCapture',
        onClick: 'onClick',
        onClickCapture: 'onClickCapture',
        onCompositionStart: 'onCompositionStart',
        onCompositionStartCapture: 'onCompositionStartCapture',
        onCompositionEnd: 'onCompositionEnd',
        onCompositionEndCapture: 'onCompositionEndCapture',
        onCompositionUpdate: 'onCompositionUpdate',
        onCompositionUpdateCapture: 'onCompositionUpdateCapture',
        onContextMenu: 'onContextMenu',
        onContextMenuCapture: 'onContextMenuCapture',
        onCopy: 'onCopy',
        onCopyCapture: 'onCopyCapture',
        onCut: 'onCut',
        onCutCapture: 'onCutCapture',
        onDoubleClick: 'onDoubleClick',
        onDoubleClickCapture: 'onDoubleClickCapture',
        onDrag: 'onDrag',
        onDragCapture: 'onDragCapture',
        onDragEnd: 'onDragEnd',
        onDragEndCapture: 'onDragEndCapture',
        onDragEnter: 'onDragEnter',
        onDragEnterCapture: 'onDragEnterCapture',
        onDragOver: 'onDragOver',
        onDragOverCapture: 'onDragOverCapture',
        onDragStart: 'onDragStart',
        onDragStartCapture: 'onDragStartCapture',
        onDrop: 'onDrop',
        onDropCapture: 'onDropCapture',
        onFocus: 'onFocus',
        onFocusCapture: 'onFocusCapture',
        onGotPointerCapture: 'onGotPointerCapture',
        onGotPointerCaptureCapture: 'onGotPointerCaptureCapture',
        onKeyDown: 'onKeyDown',
        onKeyDownCapture: 'onKeyDownCapture',
        onKeyPress: 'onKeyPress',
        onKeyPressCapture: 'onKeyPressCapture',
        onKeyUp: 'onKeyUp',
        onKeyUpCapture: 'onKeyUpCapture',
        onLostPointerCapture: 'onLostPointerCapture',
        onLostPointerCaptureCapture: 'onLostPointerCaptureCapture',
        onMouseDown: 'onMouseDown',
        onMouseDownCapture: 'onMouseDownCapture',
        onMouseEnter: 'onMouseEnter',
        onMouseLeave: 'onMouseLeave',
        onMouseMove: 'onMouseMove',
        onMouseMoveCapture: 'onMouseMoveCapture',
        onMouseOut: 'onMouseOut',
        onMouseOutCapture: 'onMouseOutCapture',
        onMouseUp: 'onMouseUp',
        onMouseUpCapture: 'onMouseUpCapture',
        onPointerCancel: 'onPointerCancel',
        onPointerCancelCapture: 'onPointerCancelCapture',
        onPointerDown: 'onPointerDown',
        onPointerDownCapture: 'onPointerDownCapture',
        onPointerEnter: 'onPointerEnter',
        onPointerLeave: 'onPointerLeave',
        onPointerMove: 'onPointerMove',
        onPointerMoveCapture: 'onPointerMoveCapture',
        onPointerOut: 'onPointerOut',
        onPointerOutCapture: 'onPointerOutCapture',
        onPointerUp: 'onPointerUp',
        onPointerUpCapture: 'onPointerUpCapture',
        onPaste: 'onPaste',
        onPasteCapture: 'onPasteCapture',
        onScroll: 'onScroll',
        onScrollCapture: 'onScrollCapture',
        onSelect: 'onSelect',
        onSelectCapture: 'onSelectCapture',
        onTouchCancel: 'onTouchCancel',
        onTouchCancelCapture: 'onTouchCancelCapture',
        onTouchEnd: 'onTouchEnd',
        onTouchEndCapture: 'onTouchEndCapture',
        onTouchMove: 'onTouchMove',
        onTouchMoveCapture: 'onTouchMoveCapture',
        onTouchStart: 'onTouchStart',
        onTouchStartCapture: 'onTouchStartCapture',
        onTransitionEnd: 'onTransitionEnd',
        onTransitionEndCapture: 'onTransitionEndCapture',
        onWheel: 'onWheel',
        onWheelCapture: 'onWheelCapture',
        role: 'role',
        slot: 'slot',
        spellCheck: 'spellCheck',
        tabIndex: 'tabIndex',
        title: 'title',
        translate: 'translate'
    }

}

function PropertyArray(obj: object, array: any[])
{
    for(const [key, value] of Object.entries(obj))
    {
        if (typeof value === 'string')
        {
            return array.push(value)
        }
        else if (
            typeof value === 'number' ||
            typeof value === 'bigint' ||
            typeof value === 'symbol'
        )
        {
            let values = Object.values(key)
            values.forEach(value => array.push(value))
            return array
        }
        else if (typeof value === 'object')
        {
            return PropertyArray(value, array)
        }
        else 
        {
            throw new Error('Unrecognized Type')
        }
    }
}


const react =
{
    toHaveProperty: () => {}
}




export {
    prop,
    PropertyArray,
    expects
}
