import { Component, createSignal } from "solid-js"

type Form = { url?: string, description?: string, year?: string, tags?: string }

let [form, setForm] = createSignal<Form>({})
let [consent, setConsent] = createSignal(false)

const AddImage: Component = () => {

  async function submitForm() {
    if (form().url?.length && form().year && form().description && consent()) {
      try {
        let result = await (await fetch("https://backend.whenwasthisphototaken.com/image")).json();
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
        <textarea onChange={(e) => setKeyInForm("description", e)} placeholder="King and Queen of Italy in a car..." class="input input-bordered w-full max-w-xs" />
      </div>
      <div class="form-control w-full max-w-xs">
        <label class="label">
          <span class="label-text">Paste the direct link to the Image:</span>
        </label>
        <input onChange={(e) => setKeyInForm("url", e)} type="url" placeholder="https://i.imgur.com/msslnkG.jpeg" class="input input-bordered w-full max-w-xs" />
      </div>
      <div class="form-control w-full max-w-xs">
        <label class="label">
          <span class="label-text">In what year was the photo taken?</span>
        </label>
        <input onChange={(e) => setKeyInForm("year", e)} type="number" minLength="4" maxlength="4" placeholder="1950" class="input input-bordered w-full max-w-xs" />
      </div>
      <div class="form-control w-full max-w-xs">
        <label class="label">
          <span class="label-text">Write some tags:</span>
        </label>
        <input onChange={(e) => setKeyInForm("tags", e)} type="text" placeholder="america portrait" class="input input-bordered w-full max-w-xs" />
      </div>

      <div class="form-control w-48">
        <label class="label cursor-pointer">
          <span class="label-text">Everything is correct: </span>
          <input checked={consent()} onClick={() => setConsent(!consent())} type="checkbox" class="checkbox" />
        </label>
      </div>
      <div>
        <button onClick={submitForm} class="btn btn-wide btn-primary">submit</button>
      </div>

    </div>
  </>)

}












export default AddImage
