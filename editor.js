//Make top left name field propagate to footer.
document.getElementById('name-field').addEventListener("input", () => {
    document.getElementById('footer-name').textContent = document.getElementById('name-field').textContent
})

let applyBackgroundStyles = () => {

    let count = 0
    let nextElement = document.getElementById('block-0')

    while(nextElement.id !== "main-footer"){
        count += 1
        if(count % 2 == 0){
            nextElement.style.backgroundColor = document.getElementById('background-2').value
        }else{
            nextElement.style.backgroundColor = document.getElementById('background-1').value
        }
        nextElement = nextElement.nextElementSibling
    }

}

applyBackgroundStyles()

let applyNavbarColors = () => {

    document.getElementById('navbar').style.backgroundColor = document.getElementById('navbar-background').value
    document.getElementById('main-footer').style.backgroundColor = document.getElementById('navbar-background').value
    document.getElementById('name-field').style.color = document.getElementById('navbar-text').value
    document.getElementById('linkedin-nav').style.color = document.getElementById('navbar-text').value
    document.getElementById('github-nav').style.color = document.getElementById('navbar-text').value
    document.getElementById('linkedin-footer').style.color = document.getElementById('navbar-text').value
    document.getElementById('github-footer').style.color = document.getElementById('navbar-text').value
    document.getElementById('copyright').style.color = document.getElementById('navbar-text').value

}

//Listen for mouseovers of any image:
for (let i = 1; i < 9; i++) {
    document.getElementById(`p${i}`).addEventListener("mouseover", () => {
        document.getElementById(`p${i}`).style.opacity = ".5";
    })

    document.getElementById(`p${i}`).addEventListener("mouseout", () => {
        document.getElementById(`p${i}`).style.opacity = "1";

    });
}

addImageListeners = () => {
    var images = document.getElementsByTagName('img')

    for (let i = 0; i < images.length; i++) {
        let img = images[i]
        img.addEventListener("click", (e) => {
            document.getElementById('editModal').style.display = "block"
            document.getElementById('editModal').innerHTML = `
            <div class='card container max-form-width pb-3'>
            <br>
            <div class="form-group my-0" id='submit_modal'>
                <h3>select image</h3>
                <input type='file' />
                <br>
            </div>
            <button id='submit' type="submit" class="btn btn-primary" onClick='cancelChangeImage()'>Cancel</button>
        </div>`

            document.querySelector('input[type="file"]').addEventListener('change', function () {

                if (this.files && this.files[0]) {
                    document.getElementById('editModal').style.display = "none"
                    getSignedRequest(this.files[0], e)
                }
            });
        })
    }
}

addImageListeners()

function getSignedRequest(file, e) {

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://wn3uwler4h.execute-api.us-east-1.amazonaws.com/production/get-signed-url');
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                uploadFile(file, response.signedRequest, response.url, e);
            }
            else {
                alert('Could not get signed URL.');
            }
        }
    };
    xhr.send(JSON.stringify({ "fileName": file.name, "fileType": file.type }));
}


function uploadFile(file, signedRequest, url, e) {
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', signedRequest);
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                document.getElementById(e.target.id).src = url;
            }
            else {
                alert('Could not upload file.');
            }
        }
    };
    xhr.send(file);
}

let cancelChangeImage = () => {
    document.getElementById('editModal').style.display = "none"
}


//listen for mouseover of linkedIn icon:
document.getElementById('linkedInIcon').addEventListener("mouseover", () => {
    document.getElementById('linkedInIcon').style.opacity = ".5";
})

document.getElementById('linkedInIcon').addEventListener("mouseout", () => {
    document.getElementById('linkedInIcon').style.opacity = "1";
})

//click on linkedIn icon:
document.getElementById('linkedInIcon').addEventListener("click", (e) => {

    e.preventDefault()

    document.getElementById('editModal').style.display = "block"
    document.getElementById('editModal').innerHTML = `
    <div class='card container max-form-width pb-3'>
    <br>
    <div class="form-group my-0" id='submit_modal'>
        <h3>LinkedIn</h3>
        <input type="text" class="form-control" id="linkedIn_input" placeholder="www.linkedin.com/in/">
        <br>
    </div>
    <button id='submit' type="submit" class="btn btn-primary btn-block">Save</button>
</div>`

    if (document.getElementById('linkedInIcon').href.includes('noaddress')) {
        document.getElementById('linkedIn_input').value = ''
    } else {
        document.getElementById('linkedIn_input').value = document.getElementById('linkedInIcon').href.replace('https://', '')
    }

    document.getElementById('submit').addEventListener("click", () => {
        let linkedInURL = document.getElementById('linkedIn_input').value
        document.getElementById('linkedInIcon').href = `https://${linkedInURL}`
        document.getElementById('linkedInIconFooter').href = `https://${linkedInURL}`
        document.getElementById('editModal').style.display = "none"
    })

})


//click on gitHub icon:
document.getElementById('githubIcon').addEventListener("click", (e) => {

    e.preventDefault()

    document.getElementById('editModal').style.display = "block"
    document.getElementById('editModal').innerHTML = `
    <div class='card container max-form-width pb-3'>
    <br>
    <div class="form-group my-0" id='submit_modal'>
        <h3>github</h3>
        <input type="text" class="form-control" id="github_input" placeholder="www.github.com/">
        <br>
    </div>
    <button id='submit' type="submit" class="btn btn-primary btn-block">Save</button>
</div>`


    if (document.getElementById('githubIcon').href.includes('noaddress')) {
        document.getElementById('github_input').value = ''
    } else {
        document.getElementById('github_input').value = document.getElementById('githubIcon').href.replace('https://', '')
    }

    document.getElementById('submit').addEventListener("click", () => {
        let githubURL = document.getElementById('github_input').value
        document.getElementById('githubIcon').href = `https://${githubURL}`
        document.getElementById('githubIconFooter').href = `https://${githubURL}`
        document.getElementById('editModal').style.display = "none"
    })

})

//listen for mouseover of github image:
document.getElementById('githubIcon').addEventListener("mouseover", () => {
    document.getElementById('githubIcon').style.opacity = ".5";
})

document.getElementById('githubIcon').addEventListener("mouseout", () => {
    document.getElementById('githubIcon').style.opacity = "1";
})


//listen for mouseovers and clicks of linkedIn icons in quotes:
for (let i = 1; i < 4; i++) {
    document.getElementById(`quotes-linkedin-${i}`).addEventListener("mouseover", () => {
        document.getElementById(`quotes-linkedin-${i}`).style.opacity = ".5";
    })

    document.getElementById(`quotes-linkedin-${i}`).addEventListener("mouseout", () => {
        document.getElementById(`quotes-linkedin-${i}`).style.opacity = "1";
    })

    //click on linkedIn icon:
    document.getElementById(`quotes-linkedin-${i}`).addEventListener("click", (e) => {

        e.preventDefault()

        document.getElementById('editModal').style.display = "block"
        document.getElementById('editModal').innerHTML = `
    <div class='card container max-form-width pb-3'>
    <br>
    <div class="form-group my-0" id='submit_modal'>
        <h3>LinkedIn</h3>
        <input type="text" class="form-control" id="linkedIn_input" placeholder="www.linkedin.com/in/">
        <br>
    </div>
    <button id='submit' type="submit" class="btn btn-primary btn-block">Save</button>
</div>`

        if (document.getElementById(`quotes-linkedin-${i}`).href.includes('noaddress')) {
            document.getElementById('linkedIn_input').value = ''
        } else {
            document.getElementById('linkedIn_input').value = document.getElementById(`quotes-linkedin-${i}`).href.replace('https://', '')
        }

        document.getElementById('submit').addEventListener("click", () => {
            let linkedInURL = document.getElementById('linkedIn_input').value
            document.getElementById(`quotes-linkedin-${i}`).href = `https://${linkedInURL}`
            document.getElementById('editModal').style.display = "none"
        })

    })

}



//click on showcase:
document.getElementById('iframeLinkChange').addEventListener("click", (e) => {

    document.getElementById('editModal').style.display = "block"
    document.getElementById('editModal').innerHTML = `
    <div class='card container max-form-width pb-3'>
    <br>
    <div class="form-group my-0" id='submit_modal'>
        <h3>link to showcase</h3>
        <br>
    </div>
    <input type="text" class="form-control" id="showcase_input" placeholder="">
    <button id='submit' type="submit" class="btn btn-primary" onClick='saveShowcase()'>Save</button>
    <button class="btn btn-primary" onClick='cancelShowcase()'>Cancel</button>
</div>`

})

let saveShowcase = () => {
    let newLink = document.getElementById('showcase_input').value
    document.getElementById('editModal').style.display = "none"
    document.getElementById('showcase').src = newLink
}

let cancelShowcase = () => {
    document.getElementById('editModal').style.display = "none"
}

document.getElementById('saveBtn').addEventListener("click", (e) => {

    fetch(
        "https://wn3uwler4h.execute-api.us-east-1.amazonaws.com/production/update-portfolio-home",
        {
            method: "post",
            body: JSON.stringify({
                username: 'derick',
                html: document.documentElement.outerHTML
            }),
        }
    )
        .then(function (response) {
            if (response.status !== 200) {
                console.log("Internal Server Error");
                return;
            }
        })
        .catch(function (err) {
            console.log(err);
        });


})

// document.getElementById('collapse').addEventListener("click", (e) => {

//     if (document.getElementById('sidebar').style.width == '20px') {
//         document.getElementById('sidebar').style.width = '200px'
//         document.getElementById('collapse').innerHTML = 'Close'
//         document.getElementById('collapse').classList = 'btn btn-secondary'
//         document.getElementById('content').style.marginLeft = '200px'
//         document.getElementById('dontkeepwhenclosed').style.display = 'block'
//     } else {
//         document.getElementById('sidebar').style.width = '20px'
//         document.getElementById('collapse').innerHTML = 'Menu'
//         document.getElementById('content').style.marginLeft = '0'
//         document.getElementById('dontkeepwhenclosed').style.display = 'none'
//         document.getElementById('content').style.marginLeft = '20px'
//         document.getElementById('collapse').classList = 'btn btn-primary'
//     }
// })


let addListenersToNewBlock = (blockId) => {
    document.getElementById(`remove-section-${blockId}`).addEventListener("click", (e) => {
        let confrimRemove = confirm('Are you sure you want to remove this section? Can\'t be undone.')
        if (confrimRemove) {
            document.getElementById(`block-${blockId}`).remove()
            applyBackgroundStyles()
        }
    })

    document.getElementById(`add-projects-section-${blockId}`).addEventListener("click", (e) => {
        addNewProjectsBlock(`block-${blockId}`)
    })

    document.getElementById(`add-showcase-section-${blockId}`).addEventListener("click", (e) => {
        addNewShowcaseBlock(`block-${blockId}`)
    })

    document.getElementById(`add-about-section-${blockId}`).addEventListener("click", (e) => {
        addNewAboutMeBlock(`block-${blockId}`)
    })

    document.getElementById(`add-experience-section-${blockId}`).addEventListener("click", (e) => {
        addNewExperienceBlock(`block-${blockId}`)
    })

    document.getElementById(`down-section-${blockId}`).addEventListener("click", (e) => {
        moveBlockDown(`block-${blockId}`)
        applyBackgroundStyles()
    })

    document.getElementById(`up-section-${blockId}`).addEventListener("click", (e) => {
        moveBlockUp(`block-${blockId}`)
        applyBackgroundStyles()
    })

    addImageListeners()
    applyBackgroundStyles()
}

let addListenersToNewProject = (projectId) => {
    document.getElementById(`remove-project-${projectId}`).addEventListener("click", (e) => {
        removeProject(`project-${projectId}`)
    })

    document.getElementById(`add-project-${projectId}`).addEventListener("click", (e) => {
        addProject(`project-${projectId}`)
    })

    addImageListeners()
}

let addListenersToNewExperience = (experienceId) => {

    document.getElementById(`remove-experience-${experienceId}`).addEventListener("click", (e) => {
        removeExperience(`experience-${experienceId}`)
    })
    
    document.getElementById(`add-experience-${experienceId}`).addEventListener("click", (e) => {
        addExperience(`experience-${experienceId}`)
    })
    
}

let addListenersToNewQuote = (quoteId) => {
    document.getElementById(`remove-quote-${quoteId}`).addEventListener("click", (e) => {
        removeQuote(`quote-${quoteId}`)
    })

    document.getElementById(`add-quote-${quoteId}`).addEventListener("click", (e) => {
        addQuote(`quote-${quoteId}`)
    })

    document.getElementById(`quotes-linkedin-${quoteId}`).addEventListener("mouseover", () => {
        document.getElementById(`quotes-linkedin-${quoteId}`).style.opacity = ".5";
    })

    document.getElementById(`quotes-linkedin-${quoteId}`).addEventListener("mouseout", () => {
        document.getElementById(`quotes-linkedin-${quoteId}`).style.opacity = "1";
    })

    document.getElementById(`quotes-linkedin-${quoteId}`).addEventListener("click", (e) => {

        e.preventDefault()

        document.getElementById('editModal').style.display = "block"
        document.getElementById('editModal').innerHTML = `
    <div class='card container max-form-width pb-3'>
    <br>
    <div class="form-group my-0" id='submit_modal'>
        <h3>LinkedIn</h3>
        <input type="text" class="form-control" id="linkedIn_input" placeholder="www.linkedin.com/in/">
        <br>
    </div>
    <button id='submit' type="submit" class="btn btn-primary btn-block">Save</button>
</div>`

        if (document.getElementById(`quotes-linkedin-${quoteId}`).href.includes('noaddress')) {
            document.getElementById('linkedIn_input').value = ''
        } else {
            document.getElementById('linkedIn_input').value = document.getElementById(`quotes-linkedin-${quoteId}`).href.replace('https://', '')
        }

        document.getElementById('submit').addEventListener("click", () => {
            let linkedInURL = document.getElementById('linkedIn_input').value
            document.getElementById(`quotes-linkedin-${quoteId}`).href = `https://${linkedInURL}`
            document.getElementById('editModal').style.display = "none"
        })

    })
}

/*
*Showcase Blocks
*/


let addNewShowcaseBlock = (sectionName) => {

    closeAddSectionMenu(sectionName.match(/\d+/))

    let parentNode = document.getElementById(sectionName)

    let blockId = Math.floor((Math.random() * 1000))

    let showcaseBlock =
        `<button id='remove-section-${blockId}'>( - )</button>
        <button id='down-section-${blockId}'>( down )</button>
        <button id='up-section-${blockId}'>( up )</button>
        <section id="home-game-text" class="p5">
            <h1 contenteditable="true">Hey, try this!</h1>
            <p contenteditable="true">
                Make something cute that fits in a small iframe, like the game below.
                <br>
                Need ideas for projects like this? <a href="https://codeportfolio.io/blog/small-project-ideas">click
                    here!</a>
            </p>
            <br>
            <span id='iframeLinkChange'>Click here to change iframe link</span>
        </section>
        <section id="home-game">
            <!--Get a link to your own showcase project in there!-->
            <iframe id='showcase' width="300" height="300" src="https://milofultz.com/snake_js/"
                style="border:0; margin: 0; position: absolute; top: 150px; left: 50%; transform: translate(-50%, -50%); touch-action: none; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); border-radius: 10px;">
            </iframe>
        </section>
        <button id='add-projects-section-${blockId}'>( + proj )</button>
        <button id='add-showcase-section-${blockId}'>( + show )</button>
        <button id='add-about-section-${blockId}'>( + about )</button>
        <button id='add-experience-section-${blockId}'>( + work )</button>`


    let li = document.createElement('div');
    li.id = `block-${blockId}`

    li.innerHTML = showcaseBlock
    // insert a new node after the first list item

    parentNode.parentNode.insertBefore(li, parentNode.nextSibling);

    addListenersToNewBlock(blockId)

}

/*
*About Me Blocks
*/

let addNewAboutMeBlock = (sectionName) => {

    closeAddSectionMenu(sectionName.match(/\d+/))

    let parentNode = document.getElementById(sectionName)

    let blockId = Math.floor((Math.random() * 1000))

    let aboutMeBlock =
        `<button id='remove-section-${blockId}'>( - )</button>
            <button id='down-section-${blockId}'>( down )</button>
            <button id='up-section-${blockId}'>( up )</button>
			<div id="home-about">
				<div class="container home-proj-deck">
					<h1 style='text-align: center' contenteditable="true">About Me</h1>
					<div class="card card-no-hover" style="width: 100%; margin-top: 20px; margin-bottom: 40px">
						<div class="card-body">
							<img src='https://s3-us-west-2.amazonaws.com/codeportfolio.io/img/aircraft.jpg'
								style='height:400px' class='float-left p-3' id='p-${blockId}'>
							<h3 contenteditable="true">Interests</h3>
							<p contenteditable="true">
								Use this section to share your non-coding interests!
								This stuff can be
								<a href='https://codeportfolio.io/blog/interests-get-the-gig'>surprisingly helpful</a>
								in getting the interview.
							</p>
							<br>
							<i class='fas fa-coffee fa-lg text-dark'></i> <span contenteditable="true">Interest 1</span>
							<br><br>
							<i class='fas fa-plane fa-lg text-dark'></i> <span contenteditable="true">Interest 2</span>
							<br><br>
							<i class='fa fa-volume-up fa-lg text-dark'></i> <span contenteditable="true">Interest
								3</span>
							<br><br>
							<i class='fas fa-dog fa-anchor text-dark'></i> <span contenteditable="true">Interest
								4</span>
							<br><br>
						</div>
					</div>
				</div>
			</div>
            <button id='add-projects-section-${blockId}'>( + proj )</button>
            <button id='add-showcase-section-${blockId}'>( + show )</button>
            <button id='add-about-section-${blockId}'>( + about )</button>
            <button id='add-experience-section-${blockId}'>( + work )</button>`

    // create a new li node
    let li = document.createElement('div');
    li.id = `block-${blockId}`

    li.innerHTML = aboutMeBlock
    // insert a new node after the first list item

    parentNode.parentNode.insertBefore(li, parentNode.nextSibling);

    addListenersToNewBlock(blockId)

}

/*
*Professional Experience Blocks
*/

let addNewExperienceBlock = (sectionName) => {

    closeAddSectionMenu(sectionName.match(/\d+/))

    let parentNode = document.getElementById(sectionName)

    let blockId = Math.floor((Math.random() * 1000))

    let experienceBlock =
        `<button id='remove-section-${blockId}'>( - )</button>
        <button id='down-section-${blockId}'>( down )</button>
        <button id='up-section-${blockId}'>( up )</button>
    <section id="home-career">
        <div class="container home-proj-deck">
            <h1 style='text-align: center' contenteditable="true">Professional Experience</h1>
            <p style='text-align: center' contenteditable="true">
                Tell the stories of a couple times you really nailed it. Use numbers in your story to show the
                value you delivered. Click <a href='https://codeportfolio.io/blog/writing-case-studies'>here</a> for
                help
                with this section.
                <br>
            <div class="card my-4 card-no-hover" style="width: 100%;">
                <div class="card-body">
                    <h3 class="card-title" contenteditable="true">Project Title</h3>
                    <h5 contenteditable="true">Company Name</h5>
                    <img src='./img/electronics.jpg' style='max-height:400px; max-width: 100%'
                        class='float-right ml-3 mb-3' id='p-${blockId}'>
                    <p class="card-text" contenteditable="true">Lorem ipsum dolor sit amet, consectetur adipiscing
                        elit,
                        sed do eiusmod tempor
                        incididunt ut labore et dolore magna
                        aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                        ex ea
                        commodo consequat.
                    </p>
                    <p contenteditable="true">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna
                        aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                        ex ea
                        commodo consequat.
                    </p>
                    <p contenteditable="true">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna
                        aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                        ex ea
                        commodo consequat.
                    </p>
                </div>
            </div>
            <div class="card my-4 card-no-hover" style="width: 100%;">
                <div class="card-body">
                    <h3 class="card-title" contenteditable="true">Project Title</h3>
                    <h5 contenteditable="true">Company Name</h5>
                    <img src='./img/aircraft.jpg' style='max-height:400px; max-width: 100%'
                        class='float-right ml-3 mb-3' id='p-${blockId}'>
                    <p class="card-text" contenteditable="true">Lorem ipsum dolor sit amet, consectetur adipiscing
                        elit,
                        sed do eiusmod tempor
                        incididunt ut labore et dolore magna
                        aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                        ex ea
                        commodo consequat.
                    </p>
                    <p contenteditable="true">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna
                        aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                        ex ea
                        commodo consequat.
                    </p>
                    <p contenteditable="true">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna
                        aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                        ex ea
                        commodo consequat.
                    </p>
                </div>
            </div>
        </div>
    </section>
    <button id='add-projects-section-${blockId}'>( + proj )</button>
    <button id='add-showcase-section-${blockId}'>( + show )</button>
    <button id='add-about-section-${blockId}'>( + about )</button>
    <button id='add-experience-section-${blockId}'>( + work )</button>
</div>`

    // create a new li node
    let li = document.createElement('div');
    li.id = `block-${blockId}`

    li.innerHTML = experienceBlock
    // insert a new node after the first list item

    parentNode.parentNode.insertBefore(li, parentNode.nextSibling);

    addListenersToNewBlock(blockId)

}

let addNewQuoteBlock = (sectionName) => {

    closeAddSectionMenu(sectionName.match(/\d+/))

    let parentNode = document.getElementById(sectionName)

    let blockId = Math.floor((Math.random() * 1000))

    let quoteId1 = Math.floor((Math.random() * 1000))
    let quoteId2 = Math.floor((Math.random() * 1000))
    let quoteId3 = Math.floor((Math.random() * 1000))


    let quoteBlock = `
    <button id='remove-section-${blockId}'>( - )</button>
    <button id='down-section-${blockId}'>( down )</button>
    <button id='up-section-${blockId}'>( up )</button>
    <div class="container home-proj-deck pb-4">
        <div class="p-5 bg-white card-shadow">
            <!-- Bootstrap carousel-->
            <div class="carousel slide" id="carouselIndicators-${blockId}" data-ride="carousel">
                <!-- Bootstrap inner -->
                <div class="carousel-inner align-middle carousel-height">
                    <!-- Carousel slide (recommendation/quote) #1 -->
                    <div class="carousel-item active" id="quote-${quoteId1}">
                    <button id='remove-quote-${quoteId1}'>( - )</button>
                    <button id='add-quote-${quoteId1}'>( + )</button>
                        <div class="media-body ml-3">
                            <blockquote class="blockquote border-0 p-0">
                                <p class="font-italic lead" contenteditable="true"> <i
                                        class="fa fa-quote-left mr-3 text-dark"></i>Quote 1 - Get a
                                    quote or two from a past colleague, mentor, or manager. Ideally, these
                                    quotes
                                    support the claims you made in the professional experience section
                                    above. If
                                    you
                                    have linkedIn endorsements, use those here. Make sure to ask permission
                                    and change the link on the linkedIn icon next to the person's name to
                                    their
                                    actual
                                    linkedIn profile. It's much more impactful to have proof that the quotes
                                    are
                                    coming
                                    from a real person.
    
                                </p>
                                <footer class="blockquote-footer" contenteditable="true">Name
                                    <cite title="Source Title" contenteditable="true">Company Name</cite>
                                    <a id="quotes-linkedin-${quoteId1}" href="noaddress" target="_blank"
                                        class="text-dark px-2">
                                        <i class="fab fa-linkedin fa-lg"></i></a>
                                </footer>
                            </blockquote>
                        </div>
                    </div>
    
                    <!-- Carousel slide (recommendation/quote) #2 -->
                    <div class="carousel-item" id="quote-${quoteId2}">
                    <button id='remove-quote-${quoteId2}'>( - )</button>
                    <button id='add-quote-${quoteId2}'>( + )</button>
                        <div class="media-body ml-3">
                            <blockquote class="blockquote border-0 p-0">
                                <p class="font-italic lead" contenteditable="true"> <i
                                        class="fa fa-quote-left mr-3 text-dark"></i>Quote 2 - Get a
                                    quote or two from a past colleague, mentor, or manager. Ideally, these
                                    quotes
                                    support the claims you made in the professional experience section
                                    above. If
                                    you
                                    have linkedIn endorsements, use those here. Make sure to ask permission
                                    and change the link on the linkedIn icon next to the person's name to
                                    their
                                    actual
                                    linkedIn profile. It's much more impactful to have proof that the quotes
                                    are
                                    coming
                                    from a real person.
    
                                </p>
                                <footer class="blockquote-footer" contenteditable="true">Name
                                    <cite title="Source Title" contenteditable="true">Company Name</cite>
                                    <a id="quotes-linkedin-${quoteId2}" href="noaddress" target="_blank"
                                        class="text-dark px-2">
                                        <i class="fab fa-linkedin fa-lg"></i></a>
                                </footer>
                            </blockquote>
                        </div>
                    </div>
    
                    <!-- Carousel slide (recommendation/quote) #3 -->
                    <div class="carousel-item" id="quote-${quoteId3}">
                    <button id='remove-quote-${quoteId3}'>( - )</button>
                    <button id='add-quote-${quoteId3}'>( + )</button>
                        <div class="media-body ml-3">
                            <blockquote class="blockquote border-0 p-0">
                                <p class="font-italic lead" contenteditable="true"> <i
                                        class="fa fa-quote-left mr-3 text-dark"></i> Quote 3 - Get a
                                    quote or two from a past colleague, mentor, or manager. Ideally, these
                                    quotes
                                    support the claims you made in the professional experience section
                                    above. If
                                    you
                                    have linkedIn endorsements, use those here. Make sure to ask permission
                                    and change the link on the linkedIn icon next to the person's name to
                                    their
                                    actual
                                    linkedIn profile. It's much more impactful to have proof that the quotes
                                    are
                                    coming
                                    from a real person.
    
                                </p>
                                <footer class="blockquote-footer" contenteditable="true">Name
                                    <cite title="Source Title" contenteditable="true">Company Name</cite>
                                    <a id="quotes-linkedin-${quoteId3}" href="noaddress" target="_blank"
                                        class="text-dark px-2">
                                        <i class="fab fa-linkedin fa-lg"></i></a>
                                </footer>
                            </blockquote>
                        </div>
                    </div>
    
                </div>
    
                <!-- Bootstrap controls [dots]-->
                <a class="carousel-control-prev" style="width: 50px; left: -50px;"
                    href="#carouselIndicators-${blockId}" role="button" data-slide="prev">
                    <i class="fa fa-angle-left text-dark text-lg"></i>
                </a>
                <a class="carousel-control-next width-auto" style="width: 50px; right: -50px;"
                    href="#carouselIndicators-${blockId}" role="button" data-slide="next">
                    <i class="fa fa-angle-right text-dark text-lg"></i>
                </a>
            </div>
        </div>
        <button id='add-projects-section-${blockId}'>( + proj )</button>
        <button id='add-showcase-section-${blockId}'>( + show )</button>
        <button id='add-about-section-${blockId}'>( + about )</button>
        <button id='add-experience-section-${blockId}'>( + work )</button>
        <button id='add-quote-section-${blockId}'>( + quote )</button>
    </div>`

    // create a new li node
    let li = document.createElement('div');
    li.id = `block-${blockId}`

    li.innerHTML = quoteBlock
    // insert a new node after the first list item

    parentNode.parentNode.insertBefore(li, parentNode.nextSibling);

    addListenersToNewBlock(blockId)

    addListenersToNewQuote(quoteId1)
    addListenersToNewQuote(quoteId2)
    addListenersToNewQuote(quoteId3)

}


/*
*Projects Blocks
*/

let addNewProjectsBlock = (sectionName) => {

    closeAddSectionMenu(sectionName.match(/\d+/))

    let parentNode = document.getElementById(sectionName)

    let blockId = Math.floor((Math.random() * 1000))

    let projectsBlock =
        `   <button id='remove-section-${blockId}'>( - )</button>
            <button id='down-section-${blockId}'>( down )</button>
            <button id='up-section-${blockId}'>( up )</button>
			<section id="home-projects">
				<div class="container home-proj-deck">
					<h1 class="m-0" contenteditable="true">Projects</h1>
					<p contenteditable="true">
						Showcase a few of your best code projects below. A good looking thumbnail and catchy description
						will go
						a
						long way towards getting recruiters to want to learn more.
						The cards link to detailed project descriptions.
						Click <a href='https://codeportfolio.io/project-ideas'>here</a> for project ideas!
					</p>
					<br>
					<div class="card-deck">
						<div class="card card-proj">
							<!-- Change the below link to the link to your project page -->
							<!-- <a href='./project.html'> -->
							<img class="card-img-top project-thumb" src="./img/Project_Thumb_1.PNG" alt="Card image cap"
								id="p-${blockId}" />
							<div class="card-body card-proj">
								<h5 class="card-title" contenteditable="true">Project Title</h5>
								<p class="card-text" contenteditable="true">
									A snappy one or two sentence description of this project should go here. Say why you
									made it,
									what it does, how many people use it, ect.
								</p>
								<span contenteditable="true"><strong>List the technologies you used for this project
										here.</strong></span>
							</div>
							<!-- </a> -->
						</div>
						<!-- Change the below link to the link to your project page -->
						<div class="card card-proj">
							<!-- <a href='./project.html'> -->
							<img class="card-img-top project-thumb" src="./img/Project_Thumb_2.PNG" alt="Card image cap"
								id="p-${blockId}" />
							<div class="card-body card-proj">
								<h5 class="card-title" contenteditable="true">Project Title</h5>
								<p class="card-text" contenteditable="true">
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
									incididunt ut labore et dolore magna
									aliqua incididunt ut labore.
								</p>
								<span contenteditable="true"><strong>Befunge, FRACTRAN, GolfScript, Piet, Unlambda,
										Whitespace,
										Shakespeare</strong></span>
							</div>
							<!-- </a> -->
						</div>

					</div>
					<div class='card-deck mt-3'>
						<!-- Change the below link to the link to your project page -->
						<div class="card card-proj">
							<!-- <a href='./project.html'> -->
							<img class="card-img-top project-thumb" src="./img/Project_Thumb_3.PNG" alt="Card image cap"
								id="p-${blockId}" />
							<div class="card-body card-proj">
								<h5 class="card-title" contenteditable="true">Project Title</h5>
								<p class="card-text" contenteditable="true">
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
									incididunt ut labore et dolore magna
									aliqua incididunt ut labore.
								</p>
								<span contenteditable="true"><strong>Befunge, FRACTRAN, GolfScript, Piet, Unlambda,
										Whitespace,
										Shakespeare</strong></span>
							</div>
							<!-- </a> -->
						</div>
						<!-- Change the below link to the link to your project page -->
						<div class="card card-proj">
							<!-- <a href='./project.html'> -->
							<img class="card-img-top project-thumb" src="./img/Project_Thumb_4.PNG" alt="Card image cap"
								id="p-${blockId}" />
							<div class="card-body card-proj">
								<h5 class="card-title" contenteditable="true">Project Title</h5>
								<p class="card-text" contenteditable="true">
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
									incididunt ut labore et dolore magna
									aliqua incididunt ut labore.
								</p>
								<span contenteditable="true"><strong>Befunge, FRACTRAN, GolfScript, Piet, Unlambda,
										Whitespace,
										Shakespeare</strong></span>
							</div>
							<!-- </a> -->
						</div>

					</div>
					<div class="card-deck">
					</div>
			</section>
            <button id='add-projects-section-${blockId}'>( + proj )</button>
            <button id='add-showcase-section-${blockId}'>( + show )</button>
            <button id='add-about-section-${blockId}'>( + about )</button>
            <button id='add-experience-section-${blockId}'>( + work )</button>`

    // create a new li node
    let li = document.createElement('div');
    li.id = `block-${blockId}`

    li.innerHTML = projectsBlock
    // insert a new node after the first list item

    parentNode.parentNode.insertBefore(li, parentNode.nextSibling);

    addListenersToNewBlock(blockId)

}

let moveBlockDown = (blockId) => {
    let blockToMove = document.getElementById(blockId)
    let blockToPlaceAfter = document.getElementById(blockId).nextElementSibling;

    if (blockToPlaceAfter.id == 'main-footer') {
        alert('Can\'t move this block any lower!')
        return
    }
    document.getElementById(blockId).outerHTML = ''
    blockToPlaceAfter.parentNode.insertBefore(blockToMove, blockToPlaceAfter.nextSibling);
}

let moveBlockUp = (blockId) => {
    let blockToMove = document.getElementById(blockId)
    let blockToPlaceBefore = document.getElementById(blockId).previousElementSibling;
    if (blockToPlaceBefore.id == 'block-0') {
        alert('Can\'t move this block any higher!')
        return
    }
    document.getElementById(blockId).outerHTML = ''
    blockToPlaceBefore.parentNode.insertBefore(blockToMove, blockToPlaceBefore.previousSibling);
}

let addProject = (projectId) => {

    let addNextTo = document.getElementById(projectId)

    let newProjectId = Math.floor((Math.random() * 1000))

    let project =
        `<button id='remove-project-${newProjectId}'>( - )</button>
    <button id='add-project-${newProjectId}'>( + )</button>
    <!-- Change the below link to the link to your project page -->
    <!-- <a href='./project.html'> -->
    <img class="card-img-top project-thumb" src="./img/Project_Thumb_1.PNG" alt="Card image cap"
        id="p-${newProjectId}" />
    <div class="card-body card-proj">
        <h5 class="card-title" contenteditable="true">Project Title</h5>
        <p class="card-text" contenteditable="true">
            A snappy one or two sentence description of this project should go here. Say why you
            made it,
            what it does, how many people use it, ect.
        </p>
        <span contenteditable="true"><strong>List the technologies you used for this project
                here.</strong></span>
    </div>
    <!-- </a> -->`

    // create a new li node
    let li = document.createElement('div');
    li.classList = "card card-proj"
    li.id = `project-${newProjectId}`

    li.innerHTML = project
    // insert a new node after the first list item

    addNextTo.parentNode.insertBefore(li, addNextTo.nextSibling);

    addListenersToNewProject(newProjectId)

}

let removeProject = (projectId) => {
    let confirmRemove = confirm("Are you sure you want to remove this project? This action can't be undone.")
    if(confirmRemove){
        document.getElementById(projectId).remove()
    }
}

let addProjectRow = () => {

    let newProjectId1 = Math.floor((Math.random() * 1000))
    let newProjectId2 = Math.floor((Math.random() * 1000))

    let blockToPlaceAfter = document.getElementById('add-project-row').previousElementSibling;
    let newProjectRow =
        `<div class="card card-proj" id="project-${newProjectId1}">
        <button id='remove-project-${newProjectId1}'>( - )</button>
        <button id='add-project-${newProjectId1}'>( + )</button>
        <!-- <a href='./project.html'> -->
        <img class="card-img-top project-thumb" src="./img/Project_Thumb_3.PNG" alt="Card image cap"
            id="p-${newProjectId1}" />
        <div class="card-body card-proj">
            <h5 class="card-title" contenteditable="true">Project Title</h5>
            <p class="card-text" contenteditable="true">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna
                aliqua incididunt ut labore.
            </p>
            <span contenteditable="true"><strong>Befunge, FRACTRAN, GolfScript, Piet, Unlambda,
                    Whitespace,
                    Shakespeare</strong></span>
        </div>
        <!-- </a> -->
    </div>
    <!-- Change the below link to the link to your project page -->
    <div class="card card-proj" id="project-${newProjectId2}">
        <!-- <a href='./project.html'> -->
        <button id='remove-project-${newProjectId2}'>( - )</button>
        <button id='add-project-${newProjectId2}'>( + )</button>
        <img class="card-img-top project-thumb" src="./img/Project_Thumb_4.PNG" alt="Card image cap"
            id="p-${newProjectId2}" />
        <div class="card-body card-proj">
            <h5 class="card-title" contenteditable="true">Project Title</h5>
            <p class="card-text" contenteditable="true">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna
                aliqua incididunt ut labore.
            </p>
            <span contenteditable="true"><strong>Befunge, FRACTRAN, GolfScript, Piet, Unlambda,
                    Whitespace,
                    Shakespeare</strong></span>
        </div>
        <!-- </a> -->
    </div>`

    // create a new li node
    let li = document.createElement('div');
    li.classList = "card-deck mt-3"

    li.innerHTML = newProjectRow
    // insert a new node after the first list item

    blockToPlaceAfter.parentNode.insertBefore(li, blockToPlaceAfter.nextSibling);

    addListenersToNewProject(newProjectId1)
    addListenersToNewProject(newProjectId2)

}

let removeQuote = (quote) => {

    if (checkIfOnlyQuote(quote)) {
        alert("Can't remove last quote.")
        return
    }

    if (document.getElementById(quote).nextElementSibling) {
        document.getElementById(quote).nextElementSibling.classList.add("active")
        let confirmRemove = confirm("Are you sure you want to delete this quote. This action can't be undone.")
        if(confirmRemove){
            document.getElementById(quote).remove()
        }
    }
    else if (document.getElementById(quote).previousElementSibling) {
        document.getElementById(quote).previousElementSibling.classList.add("active")
        let confirmRemove = confirm("Are you sure you want to delete this quote. This action can't be undone.")
        if(confirmRemove){
            document.getElementById(quote).remove()
        }    }

}

let checkIfOnlyQuote = (quote) => {
    if (!document.getElementById(quote).nextElementSibling && !document.getElementById(quote).previousElementSibling) {
        return true
    }
    return false
}

let addQuote = (quote) => {

    let addAfterQuote = document.getElementById(quote)

    let newQuoteId = Math.floor((Math.random() * 1000))

    let quoteBlock = `
                    <button id='remove-quote-${newQuoteId}'>( - )</button>
                    <button id='add-quote-${newQuoteId}'>( + )</button>
                        <div class="media-body ml-3">
                            <blockquote class="blockquote border-0 p-0">
                                <p class="font-italic lead" contenteditable="true"> <i
                                        class="fa fa-quote-left mr-3 text-dark"></i>Added Quote - Get a
                                    quote or two from a past colleague, mentor, or manager. Ideally, these
                                    quotes
                                    support the claims you made in the professional experience section
                                    above. If
                                    you
                                    have linkedIn endorsements, use those here. Make sure to ask permission
                                    and change the link on the linkedIn icon next to the person's name to
                                    their
                                    actual
                                    linkedIn profile. It's much more impactful to have proof that the quotes
                                    are
                                    coming
                                    from a real person.
    
                                </p>
                                <footer class="blockquote-footer" contenteditable="true">Name
                                    <cite title="Source Title" contenteditable="true">Company Name</cite>
                                    <a id="quotes-linkedin-${newQuoteId}" href="noaddress" target="_blank"
                                        class="text-dark px-2">
                                        <i class="fab fa-linkedin fa-lg"></i></a>
                                </footer>
                            </blockquote>
                        </div>`

    // create a new li node
    let li = document.createElement('div');
    li.id = `quote-${newQuoteId}`
    li.classList = "carousel-item active"
    addAfterQuote.classList = "carousel-item"
    li.innerHTML = quoteBlock
    // insert a new node after the first list item

    addAfterQuote.parentNode.insertBefore(li, addAfterQuote.nextSibling);

    addListenersToNewQuote(newQuoteId)

}

let removeExperience = (experienceId) => {

    let confirmRemove = confirm('Are you sure you want to remove this experience? This action can\'t be undone.')
    if(confirmRemove){
        document.getElementById(experienceId).remove()
    }

}

let addExperience = (experienceId) => {

    let addAfterExperience = document.getElementById(experienceId)

    let newExperienceId = Math.floor((Math.random() * 1000))

    let experienceBlock = `
    <button id='remove-experience-${newExperienceId}'>( - )</button>
    <button id='add-experience-${newExperienceId}'>( + )</button>
    <div class="card-body">
        <h3 class="card-title" contenteditable="true">Project Title</h3>
        <h5 contenteditable="true">Company Name</h5>
        <img src='./img/electronics.jpg' style='max-height:400px; max-width: 100%'
            class='float-right ml-3 mb-3' id='p6'>
        <p class="card-text" contenteditable="true">Lorem ipsum dolor sit amet, consectetur
            adipiscing
            elit,
            sed do eiusmod tempor
            incididunt ut labore et dolore magna
            aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip
            ex ea
            commodo consequat.
        </p>
        <p contenteditable="true">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut
            labore et dolore magna
            aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip
            ex ea
            commodo consequat.
        </p>
        <p contenteditable="true">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut
            labore et dolore magna
            aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip
            ex ea
            commodo consequat.
        </p>
    </div>`


    // create a new li node
    let li = document.createElement('div');
    li.id = `experience-${newExperienceId}`
    li.classList = "card my-4 card-no-hover"
    li.style.width = "100%"
    li.innerHTML = experienceBlock
    // insert a new node after the first list item

    addAfterExperience.parentNode.insertBefore(li, addAfterExperience.nextSibling);

    addListenersToNewExperience(newExperienceId)

}

//Add the event listeners for the stock stuff.
for (let i = 0; i < 6; i++) {

    if (i !== 0) {
        document.getElementById(`remove-section-${i}`).addEventListener("click", (e) => {
            let confrimRemove = confirm('Are you sure you want to remove this section? Can\'t be undone.')
            if (confrimRemove) {
                document.getElementById(`block-${i}`).remove()
                applyBackgroundStyles()
            }
        })
    }

    document.getElementById(`add-projects-section-${i}`).addEventListener("click", (e) => {
        addNewProjectsBlock(`block-${i}`)
    })

    document.getElementById(`add-showcase-section-${i}`).addEventListener("click", (e) => {
        addNewShowcaseBlock(`block-${i}`)
    })

    document.getElementById(`add-about-section-${i}`).addEventListener("click", (e) => {
        addNewAboutMeBlock(`block-${i}`)
    })

    document.getElementById(`add-experience-section-${i}`).addEventListener("click", (e) => {
        addNewExperienceBlock(`block-${i}`)
    })

    document.getElementById(`add-quote-section-${i}`).addEventListener("click", (e) => {
        addNewQuoteBlock(`block-${i}`)
    })

    document.getElementById(`new-section-section-${i}`).addEventListener("click", () => {

        if(document.getElementById(`new-section-section-${i}`).textContent == 'Add Section'){
            openAddSectionMenu(i)
        }else if(document.getElementById(`new-section-section-${i}`).textContent == 'Cancel'){
            closeAddSectionMenu(i)
        }
    
    })


}


///downs///
document.getElementById(`down-section-1`).addEventListener("click", (e) => {
    moveBlockDown('block-1')
    applyBackgroundStyles()
})

document.getElementById(`down-section-2`).addEventListener("click", (e) => {
    moveBlockDown('block-2')
    applyBackgroundStyles()
})

document.getElementById(`down-section-3`).addEventListener("click", (e) => {
    moveBlockDown('block-3')
    applyBackgroundStyles()
})

document.getElementById(`down-section-4`).addEventListener("click", (e) => {
    moveBlockDown('block-4')
    applyBackgroundStyles()
})

///ups///

document.getElementById(`up-section-1`).addEventListener("click", (e) => {
    moveBlockUp('block-1')
    applyBackgroundStyles()
})

document.getElementById(`up-section-2`).addEventListener("click", (e) => {
    moveBlockUp('block-2')
    applyBackgroundStyles()
})

document.getElementById(`up-section-3`).addEventListener("click", (e) => {
    moveBlockUp('block-3')
    applyBackgroundStyles()
})

document.getElementById(`up-section-4`).addEventListener("click", (e) => {
    moveBlockUp('block-4')
    applyBackgroundStyles()
})

//remove projects:

document.getElementById(`remove-project-1`).addEventListener("click", (e) => {
    removeProject('project-1')
})

document.getElementById(`remove-project-2`).addEventListener("click", (e) => {
    removeProject('project-2')
})

document.getElementById(`remove-project-3`).addEventListener("click", (e) => {
    removeProject('project-3')
})

document.getElementById(`remove-project-4`).addEventListener("click", (e) => {
    removeProject('project-4')
})

///Add projects///

document.getElementById(`add-project-1`).addEventListener("click", (e) => {
    addProject('project-1')
})

document.getElementById(`add-project-2`).addEventListener("click", (e) => {
    addProject('project-2')
})

document.getElementById(`add-project-3`).addEventListener("click", (e) => {
    addProject('project-3')
})

document.getElementById(`add-project-4`).addEventListener("click", (e) => {
    addProject('project-4')
})

document.getElementById('add-project-row').addEventListener("click", () => {
    addProjectRow()
})

///Remove quotes///
document.getElementById('remove-quote-1').addEventListener("click", (e) => {
    removeQuote('quote-1')
})

document.getElementById('remove-quote-2').addEventListener("click", (e) => {
    removeQuote('quote-2')
})

document.getElementById('remove-quote-3').addEventListener("click", (e) => {
    removeQuote('quote-3')
})

///Add quote///
document.getElementById('add-quote-1').addEventListener("click", (e) => {
    addQuote('quote-1')
})

document.getElementById('add-quote-2').addEventListener("click", (e) => {
    addQuote('quote-2')
})

document.getElementById('add-quote-3').addEventListener("click", (e) => {
    addQuote('quote-3')
})

///Remove Experience///
document.getElementById('remove-experience-1').addEventListener("click", (e) => {
    removeExperience('experience-1')
})

document.getElementById('remove-experience-2').addEventListener("click", (e) => {
    removeExperience('experience-2')
})

///Add Experience///
document.getElementById('add-experience-1').addEventListener("click", (e) => {
    addExperience('experience-1')
})

document.getElementById('add-experience-2').addEventListener("click", (e) => {
    addExperience('experience-2')
})

///Change colors///
document.getElementById('background-1').addEventListener("change", () => {
    applyBackgroundStyles()
})

document.getElementById('background-2').addEventListener("change", () => {
    applyBackgroundStyles()
})


document.getElementById('navbar-background').addEventListener("change", () => {
    applyNavbarColors()
})

document.getElementById('navbar-text').addEventListener("change", () => {
    applyNavbarColors()
})

let closeAddSectionMenu = (sectionId) => {
    document.getElementById(`new-span-section-${sectionId}`).style.display='none'
    document.getElementById(`add-projects-section-${sectionId}`).style.display='none'
    document.getElementById(`add-showcase-section-${sectionId}`).style.display='none'
    document.getElementById(`add-about-section-${sectionId}`).style.display='none'
    document.getElementById(`add-experience-section-${sectionId}`).style.display='none'
    document.getElementById(`add-quote-section-${sectionId}`).style.display='none'
    document.getElementById(`new-section-section-${sectionId}`).textContent='Add Section'
    document.getElementById(`new-section-section-${sectionId}`).classList='btn btn-primary'
}

let openAddSectionMenu = (sectionId) => {
    document.getElementById(`new-span-section-${sectionId}`).style.display='inline'
    document.getElementById(`add-projects-section-${sectionId}`).style.display='inline'
    document.getElementById(`add-showcase-section-${sectionId}`).style.display='inline'
    document.getElementById(`add-about-section-${sectionId}`).style.display='inline'
    document.getElementById(`add-experience-section-${sectionId}`).style.display='inline'
    document.getElementById(`add-quote-section-${sectionId}`).style.display='inline'
    document.getElementById(`new-section-section-${sectionId}`).textContent='Cancel'
    document.getElementById(`new-section-section-${sectionId}`).classList='btn btn-secondary'
}
