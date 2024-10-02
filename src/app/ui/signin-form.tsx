"use client";

import { useFormState, useFormStatus } from "react-dom";
import { signin } from "../actions/signin";

export function SigninForm() {
	const [state, action] = useFormState(signin, undefined);

	return (
		<form
			className='m-auto flex w-fit min-w-[375px] flex-col rounded-md px-4 py-2'
			action={action}
		>
			<div className='m-auto w-fit font-semibold'>Sign in to account</div>

			<input
				className='mt-4 rounded border border-gray-300 px-2 py-1'
				id='email'
				name='email'
				placeholder='name@example.com'
			/>
			{state?.errors?.email && (
				<p className='text-xs text-red-600'>{state.errors.email}</p>
			)}

			<input
				className='mt-4 rounded border border-gray-300 px-2 py-1'
				id='password'
				name='password'
				type='password'
				placeholder='secret password'
			/>
			{state?.errors?.password && (
				<div>
					<p className='text-sm font-semibold text-red-600'>
						Password must:
					</p>
					<ul>
						{state.errors.password.map(error => (
							<li className='text-xs text-red-600' key={error}>
								- {error}
							</li>
						))}
					</ul>
				</div>
			)}
			<SubmitButton />
			{state?.message && (
				<p className='text-xs text-red-600'>{state?.message}</p>
			)}
		</form>
	);
}

function SubmitButton() {
	const { pending } = useFormStatus();

	return (
		<button
			className='mt-8 rounded-md bg-gray-900 px-4 py-2 text-white shadow-sm hover:bg-gray-800'
			disabled={pending}
			type='submit'
		>
			Sign In
		</button>
	);
}
