import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../app/hooks';
import { setAuth } from '../authSlice';


export default function LoginPage() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate()


    const mockLogin = () => {
        dispatch(
            setAuth({
                token: '08487338472873782737',
                user: { id: 1, name: "shahzad", role: "admin" }
            })
        ),
            navigate('/')
    }

    return (
        <div>
            <h2>Login</h2>
            <p>This is a placeholder login screen.</p>

            <button onClick={mockLogin}>Mock Login</button>
        </div>
    );
}