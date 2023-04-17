import { emit } from 'process';
import React from 'react';
import { useForm } from 'react-hook-form';
import { RegisterParams } from '../../../models/auth';



export const RegisterForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<RegisterParams>();
  const password = React.useRef({});
  password.current = watch('password', '');

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          ={register({

             
                }
            },
          })}
        />
        {errors.email && <span>{errors.email.message}</span>}
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          ref={register({
            },
          })}
        />
        {errors.password && <span>{errors.password.message}</span>}
      </div>
      <div>
        <label htmlFor="repeatPassword">Repeat Password</label>
        <input
          id="repeatPassword"
          name="repeatPassword"
          type="password"
          ref={register({
            validate: (value) =>
              value === password.current || 'The passwords do not match',
          })}
        />
        {errors.repeatPassword && <span>{errors.repeatPassword.message}</span>}
      </div>
      <div>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          ref={register({
            required: 'Name is required',
          })}
        />
        {errors.name && <span>{errors.name.message}</span>}
      </div>
      <div>
        <label>Gender</label>
        <div>
          <input
            id="male"
            name="gender"
            type="radio"
            value="male"
            ref={register({ required: true })}
          />
          <label htmlFor="male">Male</label>
          <input
            id="female"
            name="gender"
            type="radio"
            value="female"
            ref={register({ required: true })}
          />
          <label htmlFor="female">Female</label>
          <input
            id="other"
            name="gender"
            type="radio"
            value="other"
            ref={register({ required: true })}
          />
          <label htmlFor="other">Other</label>
        </div>
        {errors.gender && <span>Gender is required</span>}
      </div>
      <div>
        <label htmlFor="regionstate">Region/State</label>
        <input
          id="regionstate"
          name="regionstate"
          type="text"
          ref={register({
            required: 'Region/State is required',
          })}
        />
        {errors.regionstate && (
          <span>{errors.regionstate.message}</span>
        )}
      </div>
      <button type="submit">Register</button>
    </form>
  );
};
