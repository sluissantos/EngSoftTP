import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

const MySnackBar = ({ open, severity, message, setClose }) => {

    return (
        <Snackbar open={open} autoHideDuration={3000} onClose={() => setClose(false)} >
            <Alert severity={severity} onClose={() => setClose(false)}>
                {message}
            </Alert>
        </Snackbar >
    );
}
export default MySnackBar
