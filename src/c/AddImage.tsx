import { Component, createSignal } from "solid-js"

type Form = { url?: string, description?: string, year?: number, tags?: string, discord_name_tag: string }

let [form, setForm] = createSignal<Form>({})
let [consent, setConsent] = createSignal(false)

const AddImage: Component = () => {

  async function submitForm() {
    if (form().url?.length && form().year && form().description && consent()) {
      let data = form()
      data.year = Number(data.year)
      try {
        let result = await fetch(`${import.meta.env.VITE_BACKEND_UPLOAD_URL}/image`, {
          method: "POST",
          body: JSON.stringify(form()),
          headers: { "Content-type": "application/json; charset=UTF-8" }
        },);
        if (result.ok) {
          alert("great success (thank you for adding an image <3)")
          setForm({ discord_name_tag: form().discord_name_tag })
          setConsent(false)
        }
      } catch (e) {
        alert(e)
      }
    } else {
      alert(
        "is everything filled out correctly?"
      )
    }
  }

  function setKeyInForm(key: string, value: any) {
    let form_cp = form()
    form_cp[key] = value.target.value
    setForm(form_cp)
    console.log(form())

  }

  return (<>
    <div class="flex flex-col items-center justify-center h-full">
      <span class="font-bold text-2xl">Add your own Image</span>

      <div class="form-control w-full max-w-xs">
        <label class="label">
          <span class="label-text">Describe the Image:</span>
          <span class="label-text-alt">description</span>
        </label>
        <textarea value={form()?.description ?? ""} onChange={(e) => setKeyInForm("description", e)} placeholder="King and Queen of Italy in a car..." class="input input-bordered w-full max-w-xs" />
      </div>
      <div class="form-control w-full max-w-xs">
        <label class="label">
          <span class="label-text">upload an image:</span>
        </label>
        <input onChange={(e) => {
          if (!e.target.files || !e.target.files[0]) return
          const file = e.target.files[0]
          // TODO: check if its an image
          const fileReader = new FileReader()
          fileReader.readAsDataURL(file)
          fileReader.onload = () => {
            let base64encodedImage = fileReader.result
            let val = { 'target': { 'value': base64encodedImage } }
            setKeyInForm('url', val)
          }

        }} type="file" class="file-input w-full max-w-xs" />
      </div>

      <div class="form-control w-full max-w-xs">
        <label class="label">
          <span class="label-text">In what year was the photo taken?</span>
        </label>
        <input value={form()?.year ?? ""} onChange={(e) => setKeyInForm("year", e)} type="number" minLength="4" maxlength="4" placeholder="1950" class="input input-bordered w-full max-w-xs" />
      </div>
      <div class="form-control w-full max-w-xs">
        <label class="label">
          <span class="label-text">Add some tags if you want:</span>
        </label>
        <input value={form()?.tags ?? ""} onChange={(e) => setKeyInForm("tags", e)} type="text" placeholder="america portrait" class="input input-bordered w-full max-w-xs" />
      </div>
      <div class="form-control w-full max-w-xs">
        <label class="label">
          <span class="label-text">if you want to participate in the giveaway write your discord name + tag here:</span>
        </label>
        <input value={form()?.discord_name_tag ?? ""} onChange={(e) => setKeyInForm("discord_name_tag", e)} type="text" placeholder="name#1234" class="input input-bordered w-full max-w-xs" />
      </div>

      <div class="form-control max-w-xs">
        <label class="label cursor-pointer">
          <span class="label-text">Everything is correct and the image is under a <a class="link" href="https://en.wikipedia.org/wiki/Free_license">free license</a> or under a <a class="link" href="https://en.wikipedia.org/wiki/Public_domain">public domain</a>: </span>
          <input checked={consent()} onClick={() => setConsent(!consent())} type="checkbox" class="checkbox" />
        </label>
      </div>
      <div>
        <button onClick={submitForm} class="btn btn-wide  btn-primary">submit</button>
      </div>

    </div>
  </>)

}












export default AddImage
