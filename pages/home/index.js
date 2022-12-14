/* Desenvolva sua lógica aqui... */

const selectedJobs = []

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
            // console.log(button.dataset.id)
            addToSelectedJobs (button.dataset.id)
        })
    })
}

function addToSelectedJobs (id) {
    const job = jobsData.find(job => job.id === parseInt(id))
    selectedJobs.push(job)
    renderSelectedJobs()
}

function renderSelectedJobs () {
    const selectedJobsList = document.querySelector(".jobs__selected")

    selectedJobsList.innerHTML = ""
    
    selectedJobs.map(selectedJob => {
        // console.log(selectedJob)
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

    prepareSelectedJobsDeleteButton ()
}

function prepareSelectedJobsDeleteButton () {
    const deleteButtons = document.querySelectorAll(".button__job--delete")
    const deleteButtonsConverted = [...deleteButtons]

    deleteButtonsConverted.map(element => {
        element.addEventListener("click", (e) => {
            // console.log(element.dataset.id)
            removeFromSelectedJobs(element.dataset.id)
        })
    })
}

function removeFromSelectedJobs(id) {

    selectedJobs.splice(selectedJobs.findIndex(element => element.id === parseInt(id)),1)

    renderSelectedJobs()
}


function start () {
    renderJobs()
}

start ()
