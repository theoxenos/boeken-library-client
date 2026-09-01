import authService from "./authService.ts";
import apiService from "../../api/apiService.ts";
import type {TUserRegistration} from "../types";

vi.mock('../../api/apiService.ts')

describe('authService', () => {
    beforeEach(() => {
        vi.resetAllMocks();
    });

    test('login should call post with the correct endpoint and payload', () => {
        vi.mocked(apiService.post);

        authService.login({email: 'testemail', password: 'testpassword'});

        expect(apiService.post).toHaveBeenCalledWith('/api/auth/login', {email: 'testemail', password: 'testpassword'});
    });

    test('register should call post with the correct endpoint and payload', () => {
        vi.mocked(apiService.post);

        const registrationData: TUserRegistration = {
            name: 'testname',
            username: 'testusername',
            password: 'testpassword'
        };

        authService.register(registrationData);

        expect(apiService.post).toHaveBeenCalledWith('/api/auth/register', {
            username: 'testusername',
            password: 'testpassword',
            name: 'testname'
        });
    });
});