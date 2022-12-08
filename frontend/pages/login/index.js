/**
 * Login Page.
 * Author: Divya Shree
 * Date: 08/12/2022
 *
 * @module pages/login
 * @requires /components/layout/layout
 * @requires /components/auth/Login
 */

import Login from './../../components/auth/Login';
import Layout from '../../components/layout/layout'
const AnimatedLogin = () => {
    return <Layout >
        <Login />
    </Layout>
}

export default AnimatedLogin;