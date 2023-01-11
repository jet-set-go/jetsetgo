import React from 'react';

const Login = () => {

    

    return (
    <div>
        <h1>Sign in</h1>
        <form action="/login/password" method="post">
            <section>
                <label htmlFor="username">Username</label>
                <input id="username" name="username" type="text" autoComplete="username" required autoFocus/>
            </section>
            <section>
                <label htmlFor="current-password">Password</label>
                <input id="current-password" name="password" type="password" autoComplete="current-password" required/>
            </section>
            <button type="submit">Sign in</button>
        </form>
        <a className="button google" href="/login/google">Sign in with Google</a>
    </div>
    );
};

export default Login;