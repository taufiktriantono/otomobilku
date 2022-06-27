import { Head } from "@inertiajs/inertia-react";
import Dashboard from "../Dashboard";

export default function AddUser(props) {

  const { action } = props

  return (
    <Dashboard auth={props.auth} header={props.header} errors={props.errors}>
      <Head title={`${action == 'store' ? 'Add' : action == 'show' ? 'Detail' : 'Edit'} User`} />
    </Dashboard>
  )

}