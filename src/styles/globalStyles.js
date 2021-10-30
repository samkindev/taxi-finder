import { makeStyles } from '@mui/styles';

const globalStyles = makeStyles(theme => ({
    centerVerticalFlex: {
        display: 'flex',
        alignItems: 'center',
    },
    centerHorizontalFlex: {
        display: 'flex',
        justifyContent: 'center',
    },
    centerFlex: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    spaceBHorizontalFlex: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    spaceBVerticalFlex: {
        display: 'flex',
        alignItems: 'space-between',
    },
    centerSpaceBHorizontalFlex: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
}));

export default globalStyles;