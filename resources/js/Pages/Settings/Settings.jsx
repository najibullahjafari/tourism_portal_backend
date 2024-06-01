// here the settings page is created code start
// start the code
import React from "react";
import { InertiaLink } from "@inertiajs/inertia-react";
import { Head } from "@inertiajs/inertia-react";
import { LayoutContext } from "@/Layouts/layout/context/layoutcontext.jsx";
import { PrimeReactProvider } from "primereact/api";
import { Button } from "primereact/button";
import styled from "styled-components";
import { usePage } from "@inertiajs/inertia-react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { useForm } from "@inertiajs/inertia-react";
import { Toast } from "primereact/toast";
import { Dropdown } from "primereact/dropdown";
import { Checkbox } from "primereact/checkbox";
import { RadioButton } from "primereact/radiobutton";
import { InputNumber } from "primereact/inputnumber";
import { Calendar } from "primereact/calendar";
import { AutoComplete } from "primereact/autocomplete";
import { Chips } from "primereact/chips";
import { MultiSelect } from "primereact/multiselect";
import { Slider } from "primereact/slider";
import { ListBox } from "primereact/listbox";
import { Password } from "primereact/password";
import { Rating } from "primereact/rating";
import { ColorPicker } from "primereact/colorpicker";
import { Editor } from "primereact/editor";
import { SplitButton } from "primereact/splitbutton";
import { SelectButton } from "primereact/selectbutton";
import { ToggleButton } from "primereact/togglebutton";
import { SelectItem } from "primereact/api";
import { FileUpload } from "primereact/fileupload";
import { ProgressBar } from "primereact/progressbar";
import { ProgressSpinner } from "primereact/progressspinner";
import { Chip } from "primereact/chip";
import { Badge } from "primereact/badge";
import { Avatar } from "primereact/avatar";
import { AvatarGroup } from "primereact/avatargroup";
import { Tag } from "primereact/tag";
import { Timeline } from "primereact/timeline";
import { Galleria } from "primereact/galleria";
import { OrganizationChart } from "primereact/organizationchart";
import { FullCalendar } from "primereact/fullcalendar";
import { AvatarDoc } from "@/Layouts/layout/AvatarDoc";
import { BadgeDoc } from "@/Layouts/layout/BadgeDoc";
import { ButtonDoc } from "@/Layouts/layout/ButtonDoc";
import { ChipDoc } from "@/Layouts/layout/ChipDoc";
import { AvatarGroupDoc } from "@/Layouts/layout/AvatarGroupDoc";
import { TagDoc } from "@/Layouts/layout/TagDoc";
import { TimelineDoc } from "@/Layouts/layout/TimelineDoc";
import { GalleriaDoc } from "@/Layouts/layout/GalleriaDoc";
// code start
const Settings = () => {
    const { layoutConfig } = useContext(LayoutContext);
    const { data } = usePage().props;
    const { errors } = usePage().props;
    const { settings } = data;
    const { user } = data;
    const { roles } = data;
    const { permissions } = data;
    const { toast } = useRef(null);
    const { form, setForm, post, processing, reset } = useForm({
        name: settings.name,
        email: settings.email,
        role: settings.role,
        permissions: settings.permissions,
        password: "",
        password_confirmation: "",
    });
    const [selectedRoles, setSelectedRoles] = useState(null);
    const [selectedPermissions, setSelectedPermissions] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedFiles, setSelectedFiles] = useState(null);
    const [selectedRating, setSelectedRating] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedEditor, setSelectedEditor] = useState(null);
    const [selectedSplitButton, setSelectedSplitButton] = useState(null);
    const [selectedSelectButton, setSelectedSelectButton] = useState(null);
    const [selectedToggleButton, setSelectedToggleButton] = useState(null);
    const [selectedListbox, setSelectedListbox] = useState(null);
    const [selectedListboxMultiple, setSelectedListboxMultiple] = useState([]);
    const [selectedChips, setSelectedChips] = useState([]);
    const [selectedChipsMultiple, setSelectedChipsMultiple] = useState([]);
    const [selectedChipsGroup, setSelectedChipsGroup] = useState([]);
    const [selectedChipsGroupMultiple, setSelectedChipsGroupMultiple] =
        useState([]);
    const [selectedSlider, setSelectedSlider] = useState(null);
    const [selectedOrganizationChart, setSelectedOrganizationChart] =
        useState(null);
    const [selectedFullCalendar, setSelectedFullCalendar] = useState(null);
    const [selectedTimeline, setSelectedTimeline] = useState(null);
    const [selectedGalleria, setSelectedGalleria] = useState(null);
    const [selectedAutoComplete, setSelectedAutoComplete] = useState(null);
    const [selectedMultiSelect, setSelectedMultiSelect] = useState(null);
    const [selectedPassword, setSelectedPassword] = useState(null);
    const [selectedToggle, setSelectedToggle] = useState(null);
    const [selectedInputNumber, setSelectedInputNumber] = useState(null);
    const [selectedRadioButton, setSelectedRadioButton] = useState(null);
    const [selectedCheckbox, setSelectedCheckbox] = useState(null);
    const [selectedDropdown, setSelectedDropdown] = useState(null);
    const [selectedCalendar, setSelectedCalendar] = useState(null);
    // other part start
    const onUpload = (event) => {
        setSelectedFiles(event.files);
        toast.current.show({
            severity: "info",
            summary: "Success",
            detail: "File Uploaded",
        });
    };
    const onBasicUpload = (event) => {
        toast.current.show({
            severity: "info",
            summary: "Success",
            detail: "File Uploaded",
        });
    };
    const onBasicUploadAuto = (event) => {
        toast.current.show({
            severity: "info",
            summary: "Success",
            detail: "File Uploaded",
        });
    };
    const onBasicUploadAutoCancel = (event) => {
        toast.current.show({
            severity: "info",
            summary: "Cancel",
            detail: "User Cancelled",
        });
    };
    const onBasicUploadAutoError = (event) => {
        toast.current.show({
            severity: "error",
            summary: "Error",
            detail: "Error in upload",
        });
    };
    const onBasicUploadAutoCustom = (event) => {
        toast.current.show({
            severity: "info",
            summary: "Success",
            detail: "File Uploaded",
        });
    };
    const onBasicUploadAutoCustomCancel = (event) => {
        toast.current.show({
            severity: "info",
            summary: "Cancel",
            detail: "User Cancelled",
        });
    };
    const onBasicUploadAutoCustomError = (event) => {
        toast.current.show({
            severity: "error",
            summary: "Error",
            detail: "Error in upload",
        });
    };
    const onBasicUploadAutoCustomAdvanced = (event) => {
        toast.current.show({
            severity: "info",
            summary: "Success",
            detail: "File Uploaded",
        });
    };
    const onBasicUploadAutoCustomAdvancedCancel = (event) => {
        toast.current.show({
            severity: "info",
            summary: "Cancel",
            detail: "User Cancelled",
        });
    };
    const onBasicUploadAutoCustomAdvancedError = (event) => {
        toast.current.show({
            severity: "error",
            summary: "Error",
            detail: "Error in upload",
        });
    };
    const onBasicUploadAutoCustomAdvancedProgress = (event) => {
        toast.current.show({
            severity: "info",
            summary: "Progress",
            detail: "Uploading",
        });
    };
    const onBasicUploadAutoCustomAdvancedDrag = (event) => {
        toast.current.show({
            severity: "info",
            summary: "Drag",
            detail: "Dragging",
        });
    };
    const onBasicUploadAutoCustomAdvancedDrop = (event) => {
        toast.current.show({
            severity: "info",
            summary: "Drop",
            detail: "Dropping",
        });
    };
    const onBasicUploadAutoCustomAdvancedSelect = (event) => {
        toast.current.show({
            severity: "info",
            summary: "Select",
            detail: "Selecting",
        });
    };
    const onBasicUploadAutoCustomAdvancedRemove = (event) => {
        toast.current.show({
            severity: "info",
            summary: "Remove",
            detail: "Removing",
        });
    };
    //  start the main
    return (
        <PrimeReactProvider>
            <Head title="Settings" />
            <Toast ref={toast} />
            <div className="p-grid p-fluid">
                <div className="p-col-12">
                    <div className="card">
                        <h1>Settings</h1>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                post("/settings");
                            }}
                        >
                            <div className="p-field p-grid">
                                <label
                                    htmlFor="name"
                                    className="p-col-12 p-md-2"
                                >
                                    Name
                                </label>
                                <div className="p-col-12 p-md-10">
                                    <InputText
                                        id="name"
                                        value={form.name}
                                        onChange={(e) =>
                                            setForm("name", e.target.value)
                                        }
                                    />
                                    {errors.name && (
                                        <small
                                            id="username2-help"
                                            className="p-error"
                                        >
                                            {errors.name}
                                        </small>
                                    )}
                                </div>
                            </div>
                            <div className="p-field p-grid">
                                <label
                                    htmlFor="email"
                                    className="p-col-12 p-md-2"
                                >
                                    Email
                                </label>
                                <div className="p-col-12 p-md-10">
                                    <InputText
                                        id="email"
                                        value={form.email}
                                        onChange={(e) =>
                                            setForm("email", e.target.value)
                                        }
                                    />
                                    {errors.email && (
                                        <small
                                            id="email2-help"
                                            className="p-error"
                                        >
                                            {errors.email}
                                        </small>
                                    )}
                                </div>
                            </div>
                            <div className="p-field p-grid">
                                <label
                                    htmlFor="role"
                                    className="p-col-12 p-md-2"
                                >
                                    Role
                                </label>
                                <div className="p-col-12 p-md-10">
                                    <Dropdown
                                        id="role"
                                        value={form.role}
                                        options={roles}
                                        onChange={(e) =>
                                            setForm("role", e.value)
                                        }
                                        optionLabel="name"
                                        placeholder="Select a Role"
                                    />
                                    {errors.role && (
                                        <small
                                            id="role2-help"
                                            className="p-error"
                                        >
                                            {errors.role}
                                        </small>
                                    )}
                                </div>
                            </div>
                            <div className="p-field p-grid">
                                <label
                                    htmlFor="permissions"
                                    className="p-col-12 p-md-2"
                                >
                                    Permissions
                                </label>
                                <div className="p-col-12 p-md-10">
                                    <MultiSelect
                                        id="permissions"
                                        value={form.permissions}
                                        options={permissions}
                                        onChange={(e) =>
                                            setForm("permissions", e.value)
                                        }
                                        optionLabel="name"
                                        placeholder="Select Permissions"
                                    />
                                    {errors.permissions && (
                                        <small
                                            id="permissions2-help"
                                            className="p-error"
                                        >
                                            {errors.permissions}
                                        </small>
                                    )}
                                </div>
                            </div>
                            <div className="p-field p-grid">
                                <label
                                    htmlFor="password"
                                    className="p-col-12 p-md-2"
                                >
                                    Password
                                </label>
                                <div className="p-col-12 p-md-10">
                                    <Password
                                        id="password"
                                        value={form.password}
                                        onChange={(e) =>
                                            setForm("password", e.target.value)
                                        }
                                    />
                                    {errors.password && (
                                        <small
                                            id="password2-help"
                                            className="p-error"
                                        >
                                            {errors.password}
                                        </small>
                                    )}
                                </div>
                            </div>
                            <div className="p-field p-grid">
                                <label
                                    htmlFor="password_confirmation"
                                    className="p-col-12 p-md-2"
                                >
                                    Confirm Password
                                </label>
                                <div className="p-col-12 p-md-10">
                                    <Password
                                        id="password_confirmation"
                                        value={form.password_confirmation}
                                        onChange={(e) =>
                                            setForm(
                                                "password_confirmation",
                                                e.target.value
                                            )
                                        }
                                    />
                                    {errors.password_confirmation && (
                                        <small
                                            id="password_confirmation2-help"
                                            className="p-error"
                                        >
                                            {errors.password_confirmation}
                                        </small>
                                    )}
                                </div>
                            </div>
                            <div className="p-field p-grid">
                                <div className="p-col-12 p-md-2">
                                    <Button
                                        label="Save"
                                        type="submit"
                                        className="p-button-success"
                                        loading={processing}
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </PrimeReactProvider>
    );
};
export default Settings;
