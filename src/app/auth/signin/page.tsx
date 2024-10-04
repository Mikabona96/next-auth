import React from "react";
import { SigninForm } from "./_components/signin-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const SignIn = () => {
	return (
		<main className='mt-4'>
			<div className='container'>
				<h1 className='text-3xl font-bold tracking-tight'>Sign In</h1>
				<div className='my-4 h-1 bg-muted' />
				{/* Signin Form */}
				<SigninForm />

				{/* OAuth Links */}

				{/* Go to Sign Up */}
				<div className='my-4 h-1 bg-muted'></div>
				<p>
					Don&apos;t have an account? Click{" "}
					<Button className='px-0 text-base' variant={"link"}>
						<Link href={"/auth/signup"}>here</Link>
					</Button>{" "}
					to sign up.
				</p>
			</div>
		</main>
	);
};

export default SignIn;
