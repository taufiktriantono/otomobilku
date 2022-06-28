import Button from "@/Components/Button";
import Input from "@/Components/Input";
import Label from "@/Components/Label";
import ValidationErrors from "@/Components/ValidationErrors";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
import { Head, Link, useForm } from "@inertiajs/inertia-react";
import { useEffect, useState } from "react";
import Dashboard from "../Dashboard";

export default function AddUser(props) {

  const { action } = props

  const [passwordVisible, setPasswordVisible] = useState(true)
  const [confirmationVisible, setConfirmationVisible] = useState(true)

  const { data, setData, post, processing, errors, reset } = useForm({
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      password_confirmation: '',
      role_id: 1
  });

  useEffect(() => {
      return () => {
          reset('password', 'password_confirmation');
      };
  }, []);

  const onHandleChange = (event) => {
      setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
  };

  const onHandlePasswordConfirmation = (e) => {
    setConfirmationVisible(!confirmationVisible)
  }

  const submit = (e) => {
      e.preventDefault();

      post(route('store-user'));
  };

  return (
    <Dashboard auth={props.auth} header={props.header} errors={props.errors}>
      <Head title={`${action == 'store' ? 'Add' : action == 'show' ? 'Detail' : 'Edit'} User`} />

      <ValidationErrors errors={errors} />

      <form onSubmit={submit} className="w-1/2 p-6 bg-white shadow-md">
        <div className="mb-4 font-bold text-lg">Add User</div>
        <input type={"hidden"} name="role_id" value={data.role_id} />
        <div>
            <Label forInput="first_name" value="First Name" />

            <Input
                type="text"
                name="first_name"
                value={data.first_name}
                className="mt-1 block w-full"
                autoComplete="first_name"
                isFocused={true}
                handleChange={onHandleChange}
                required
            />
        </div>

        <div className="mt-4">
            <Label forInput="last_name" value="Last Name" />

            <Input
                type="text"
                name="last_name"
                value={data.last_name}
                className="mt-1 block w-full"
                autoComplete="last_name"
                isFocused={true}
                handleChange={onHandleChange}
                required
            />
        </div>

        <div className="mt-4">
            <Label forInput="email" value="Email" />

            <Input
                type="email"
                name="email"
                value={data.email}
                className="mt-1 block w-full"
                autoComplete="username"
                handleChange={onHandleChange}
                required
            />
        </div>

        <div className="mt-4">
            <Label forInput="password" value="Password" />
            <label htmlFor="password_confirmation" className="relative block">
              <Input
                  type={passwordVisible ? "password" : "text"}
                  name="password"
                  value={data.password}
                  className="mt-1 w-full"
                  handleChange={onHandleChange}
                  required
              />

              {
                passwordVisible ? (<EyeIcon className="w-6 h-6 absolute cursor-pointer mr-2 top-1/2 transform -translate-y-1/2 right-0" onClick={() => setPasswordVisible(!passwordVisible)} />) :
                  <EyeOffIcon className="w-6 h-6 absolute cursor-pointer mr-2 top-1/2 transform -translate-y-1/2 right-0" onClick={() => setPasswordVisible(!passwordVisible)} />
              }

            </label>
        </div>

        <div className="mt-4">
            <Label forInput="password_confirmation" value="Confirm Password" />
            <label htmlFor="password_confirmation" className="relative block">
              <Input
                  type={confirmationVisible ? "password" : "text"}
                  name="password_confirmation"
                  value={data.password_confirmation}
                  className="mt-1 w-full"
                  handleChange={onHandleChange}
                  required
              />

              {
                confirmationVisible ? (<EyeIcon className="w-6 h-6 absolute cursor-pointer mr-2 top-1/2 transform -translate-y-1/2 right-0" onClick={() => setConfirmationVisible(!confirmationVisible)} />) :
                  <EyeOffIcon className="w-6 h-6 absolute cursor-pointer mr-2 top-1/2 transform -translate-y-1/2 right-0" onClick={() => setConfirmationVisible(!confirmationVisible)} />
              }

            </label>

        </div>

        <div className="flex items-center justify-end mt-4">
            <Button className="ml-4" processing={processing}>
                Save
            </Button>
        </div>
      </form>
    </Dashboard>
  )

}