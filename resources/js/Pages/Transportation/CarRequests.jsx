import { useEffect } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import Layout from "@/Layouts/layout/layout.jsx";
export default function Transportation() {
  //  $table->id();
  //         $table->string('name');
  //         $table->string('father_name')->nullable();
  //         $table->string('tazkira_no')->nullable();
  //         $table->string('passport')->nullable();
  //         $table->string('image')->nullable();
  //         $table->string('phone')->nullable();
  //         $table->string('location')->nullable();
  //         $table->string('entity_type')->nullable();
  //         $table->string('email')->unique();
  //         $table->timestamp('email_verified_at')->nullable();
  //         $table->string('password');
  //         $table->rememberToken();
  //         $table->timestamps();
  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    father_name: "",
    tazkira_no: "",
    passport: "",
    image: "",
    location: "",
    entity_type: "",
  });

  useEffect(() => {
    return () => {
      reset("password", "password_confirmation");
    };
  }, []);

  const submit = (e) => {
    e.preventDefault();

    post(route("car/requests"));
  };
  // Function to handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setData("passport", file); // Update the 'passport' field with the file object
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData(name, value);
  };
  return (
    <Layout>
      <Head title="Transportation" />

      <div className="flex align-items-center justify-content-center flex-column">
        <div className="surface-card p-6 sm:p-4 shadow-2 border-round w-full ">
          <div className="text-center mb-5">
            <div className="text-900 text-3xl font-medium mb-3">Register</div>
          </div>
          <form onSubmit={submit}>
            <div>
              {/* for name */}
              <div className="mb-3">
                <label
                  htmlFor="name"
                  className="block text-900 font-medium mb-2"
                >
                  Name
                </label>
                <InputText
                  id="name"
                  type="text"
                  placeholder="Name"
                  className="w-full"
                  value={data.name}
                  onChange={(e) => setData("name", e.target.value)}
                />
                <InputError message={errors.email} className="" />
              </div>
              {/* for father anme */}
              <div className="mb-3">
                <label
                  htmlFor="father_name"
                  className="block text-900 font-medium mb-2"
                >
                  Father Name
                </label>
                <InputText
                  id="father_name"
                  type="text"
                  placeholder="Father Name"
                  className="w-full"
                  value={data.father_name}
                  onChange={(e) => setData("father_name", e.target.value)}
                />
                <InputError message={errors.father_name} className="" />
              </div>
              {/* for tazkira number */}
              <div className="mb-3">
                <label
                  htmlFor="tazkira_no"
                  className="block text-900 font-medium mb-2"
                >
                  Tazkira Number
                </label>
                <InputText
                  id="tazkira_no"
                  type="text"
                  placeholder="Tazkira Number"
                  className="w-full"
                  value={data.tazkira_no}
                  onChange={(e) => setData("tazkira_no", e.target.value)}
                />
                <InputError message={errors.tazkira_no} className="" />
              </div>
              {/* for passport photo */}
              <div className="mb-3">
                <label
                  htmlFor="passport"
                  className="block text-900 font-medium mb-2"
                >
                  Paaport image
                </label>
                <input
                  type="file"
                  id="passport"
                  name="passport"
                  onChange={handleFileUpload}
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="email"
                  className="block text-900 font-medium mb-2"
                >
                  Email
                </label>
                <InputText
                  id="email"
                  type="text"
                  placeholder="Email address"
                  className="w-full"
                  value={data.email}
                  onChange={(e) => setData("email", e.target.value)}
                />
                <InputError message={errors.email} className="" />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="password"
                  className="block text-900 font-medium mb-2"
                >
                  Password
                </label>
                <InputText
                  id="password"
                  type="password"
                  placeholder="Password"
                  className="w-full"
                  value={data.password}
                  onChange={(e) => setData("password", e.target.value)}
                />
                <InputError message={errors.password} className="" />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="password_confirmation"
                  className="block text-900 font-medium mb-2"
                >
                  Confirm Password
                </label>
                <InputText
                  id="password_confirmation"
                  type="password"
                  placeholder="Confirm Password"
                  className="w-full"
                  value={data.password_confirmation}
                  onChange={(e) =>
                    setData("password_confirmation", e.target.value)
                  }
                />
                <InputError
                  message={errors.password_confirmation}
                  className=""
                />
              </div>

              <div className="flex align-items-center justify-content-end mb-4">
                <Link href={route("login")} className="">
                  Already registered?
                </Link>
              </div>

              <PrimaryButton
                label="Register"
                className="w-full"
                disabled={processing}
              />
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
