import React from "react";
import { SignupForm } from "./_components/signup-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const SignUp = () => {
	return (
		<main className='mt-4'>
			<div className='container'>
				<h1 className='text-3xl font-bold tracking-tight'>Sign Up</h1>
				<div className='my-4 h-1 bg-muted' />
				{/* Signup Form */}
				<SignupForm />

				{/* OAuth Links */}

				{/* Go to Sign In */}
				<div className='my-4 h-1 bg-muted'></div>
				<p>
					Already have an account? Click{" "}
					<Button className='px-0 text-base' variant={"link"}>
						<Link href={"/auth/signin"}>here</Link>
					</Button>{" "}
					to sign in.
				</p>
			</div>
		</main>
	);
};

export default SignUp;
