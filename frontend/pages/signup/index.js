/**
 * Signup Page.
 * Author: Divya Shree
 * Date: 08/12/2022
 *
 * @module pages/login
 * @requires /components/layout/layout
 * @requires /components/auth/Signup
 */
import Signup from './../../components/auth/Signup';
import Layout from '../../components/layout/layout';

const AnimatedSignIn = () => {
    return <Layout >
        <Signup />
    </Layout>
}

export default AnimatedSignIn;