/* Desenvolva sua lógica aqui... */

let selectedJobs = []

function renderJobs() {
    const jobsList = document.querySelector(".jobs__list")

    jobsData.map(job => {
        jobsList.insertAdjacentHTML("beforeend",`
        <li class="job">
            <div class="job__header">
            <h4 class="job__title title-4">${job.title}</h4>
            <div>
                <span class="enterprise__name text-3">${job.enterprise}</span>
                <span class="enterprise__location text-3">${job.location}</span>
            </div>
            </div>

            <p class="job__description text-2">${job.descrition}</p>

            <div class="job__footer">
                <div>
                    <span class="job__modalities modality text-3">${job.modalities[0]}</span>
                    <span class="job__modalities modality text-3">${job.modalities[1]}</span>
                </div>
                <button class="job__apply button button--big text-2" data-id="${job.id}">Candidatar</button>
            </div>
         </li>
    `)
    })
    prepareJobsApplyButton ()
}

function prepareJobsApplyButton () {
    const buttons = document.querySelectorAll(".job__apply")
    const buttonsConverted = [...buttons]

    buttonsConverted.map(button => {
        button.addEventListener("click", (e) =>{
            button.classList.toggle("applied")
            if (button.classList.contains("applied")) {
                button.innerText = "Remover candidatura"
                addToSelectedJobs (button.dataset.id)
            }
            else {
                button.innerText = "Candidatar"
                removeFromSelectedJobs(button.dataset.id)
            }
        })
    })
}

function updateApplyButtons () {
    const buttons = document.querySelectorAll(".job__apply")
    const buttonsConverted = [...buttons]

    buttonsConverted.map(button => {
        if (selectedJobs.find(job => job.id == button.dataset.id)) {
            button.classList.add("applied")
        }
        else {
            button.classList.remove("applied")
        }
    })

    // buttonsConverted.innerText = "Candidatar"

    buttonsConverted.filter(button => !button.classList.contains("applied")).map(button => button.innerText = "Candidatar")

    buttonsConverted.filter(button => button.classList.contains("applied")).map(button => button.innerText = "Remover candidatura")
}

function addToSelectedJobs (id) {
    const job = jobsData.find(job => job.id === parseInt(id))
    selectedJobs.push(job)
    setLocalStorage ()
    renderSelectedJobs()
}

function setLocalStorage () {
    localStorage.setItem("@Webwomen:selectJobs", JSON.stringify(selectedJobs))
}

function getLocalStorage () {
    selectedJobs = JSON.parse(localStorage.getItem("@Webwomen:selectJobs")) ||[]
}

function renderSelectedJobs () {
    const selectedJobsList = document.querySelector(".jobs__selected")

    if (selectedJobs.length === 0) {
        selectedJobsList.innerHTML = ""

        selectedJobsList.insertAdjacentHTML("beforeend",`
        <li class="job__selected">
            <span class="text-2">Você ainda não aplicou para nenhuma vaga</span>
        </li>
        `)
    }
    else {
        selectedJobsList.innerHTML = ""
        
        selectedJobs.map(selectedJob => {
            selectedJobsList.insertAdjacentHTML("beforeend", `
            <li class="job__selected">
                <div class="job__selected--header">
                    <h5 class="title-5">${selectedJob.title}</h5>
                    <button class="button__job--delete" data-id="${selectedJob.id}">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
                <div class="job__enterprise">
                    <span class="enterprise__name text-3">${selectedJob.enterprise}</span>
                    <span class="enterprise__location text-3">${selectedJob.location}</span>
                </div>
            </li>
        `)
        })
    }

    prepareSelectedJobsDeleteButton ()
}

function prepareSelectedJobsDeleteButton () {
    const deleteButtons = document.querySelectorAll(".button__job--delete")
    const deleteButtonsConverted = [...deleteButtons]

    deleteButtonsConverted.map(element => {
        element.addEventListener("click", (e) => {
            removeFromSelectedJobs(element.dataset.id)
            updateApplyButtons()
        })
    })
}

function removeFromSelectedJobs(id) {
    selectedJobs.splice(selectedJobs.findIndex(element => element.id === parseInt(id)),1)
    setLocalStorage ()
    renderSelectedJobs()
}

function start () {
    renderJobs()
    getLocalStorage()
    renderSelectedJobs()
    updateApplyButtons ()
}

start ()
