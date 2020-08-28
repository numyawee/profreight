import { useStyles } from 'react-styles-hook'

export default useStyles({
    aligncenter: {
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    alignitemcenter: {
        textAlign: 'center'
    },
    rowmargin: {
        marginRight: 15,
        marginLeft: 15,
    },
    gridrowheader: {
        display: 'flex',
        flexDirection: 'row'        
    },
    gridcenter: {
        textAlign: 'center'
    },
    usestatuscol: {
        width: 90,
        textAlign: 'center'
    },
    rowindexcol: {
        width: 50,
        textAlign: 'right'
    },
    formround : {
        borderRadius: 50
    },
    formtextarearound : {
        borderRadius: 15
    },
    formbutton : {
        backgroundColor: '#78BE9C',
        borderColor: '#78BE9C'
    },
    formbuttonoutline : {
        backgroundColor: 'white',
        borderColor: '#78BE9C',
        color: '#78BE9C'
    },
    formcontrol : {
        marginLeft: 5
    }
});