import Layout from "@/Layouts/Main";
import { Head } from "@inertiajs/inertia-react";

export default function SuccessRequest(props) {

  return (
    <Layout>
      <Head title='Situs Jual Beli Mobil Online' />
      <div className="m-auto w-2/5">
        <div className="space-y-4">
          <div className="text-2xl font-bold text-center">
            <div>Permintaan berhasil di simpan, Team kami akan segera menghubungi Anda.</div>
          </div>
        </div>
      </div>
    </Layout>
  )

}