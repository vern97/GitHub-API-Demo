$('#document').ready(function () {
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: 'api/user',
        success: displayUser,
        error: errorOnAjax
    });
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: 'api/repositories',
        success: displayRepos,
        error: errorOnAjax
    });
});

// pulls the repo for commit list
function getRepo(user, repo) {
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: '/api/commits?user=' + user + '&repo=' + repo,
        success: displayCommits,
        error: errorOnAjax
    });
}

function errorOnAjax() {
    console.log('Error on AJAX return');
}

function displayUser(data) {
    $('#user').append(`
        <div class="row">
            <div class="col-lg-6">
                <img class="rounded" src="${data.Avatar_Url}" style="max-width:200px;">
            </div>
            <div class="col-lg-6">
                <h5><a class="text-decoration-none text-dark" href="${data.Html_Url}">${data.Name}</a></h5>
                <p>${data.Login}</p>
                <p>${data.Email}</p>
                <p>${data.Company}</p>
                <p>${data.Location}</p>
            </div>
        </div>
    `)
}

// I know this could have been done easier with a single .append and for loop. I wanted to challenge myself keeping track of tags as they were added to the DOM because javascript is not my forte
// adds each repo to the DOM, max 3 per line. Will account for new repos being added as well as updated repos, sorting my newest updated repo.
function displayRepos(data) {
    var numRows = Math.ceil(data.length / 3);
    var repoNum = 0;
    var colNum = 0;
    $('#repos').append("<h1>Repositories</h1><hr />");
    for (var i = 0; i < numRows; i++) {
        // create row containing up to 3 repos
        $('#repos').append("<div class='row' id='row" + i + "'></div>");
        for (var j = 0; j < 3; j++) {
            // create col for 1 repo
            $('#row' + i).append("<div class='col-lg-4' id='col" + colNum + "'></div>");
            // create card on current col
            $('#col' + colNum).append("<div class='card shadow mb-3' id='card" + colNum + "'></div>");
            // insert repo name in a header
            $('#card' + colNum).append("<div class='card-header'><a class='text-decoration-none text-dark' href='" + data[repoNum].Html_Url + "'>" + data[repoNum].Name + "</a></div>");
            // insert repo img
            $('#card' + colNum).append("<div class='row no-gutters' id='cardrow" + colNum + "'></div>");
            $('#cardrow' + colNum).append("<div class='col-md-4' id='cardimg" + colNum + "'></div>");
            $('#cardimg' + colNum).append("<img class='card-img' alt='none' src='" + data[repoNum].Owner.Avatar_url + "'>");
            // insert repo info
            $('#cardrow' + colNum).append("<div class='col-md-8' id='bodycon" + colNum + "'></div>");
            $('#bodycon' + colNum).append("<div class='card-body' id='body" + colNum + "'></div>");
            $('#body' + colNum).append("<p class='card-text'>" + data[repoNum].Owner.Login + "</p>");
            $('#body' + colNum).append("<p class='card-text'><small class='text-muted'> Last updated " + getDate(data[repoNum].Updated_At) + " days ago</small></p>");
            $('#card' + colNum).append("<div class='card-footer' id='cardfooter" + colNum + "'></div>")
            // insert show commit button in a footer
            $('#cardfooter' + colNum).append("<input type='button' class='btn btn-success btn-sm btn-block' id='" + data[repoNum].Owner.Login + "'  name='" + data[repoNum].Name + "' onclick='getRepo(this.id, this.name)' value='Show Commits' />");

            repoNum += 1;
            colNum += 1;
        }
    }
}

// shows 30 most recent commits
function displayCommits(data) {
    $('#commits_div').empty();
    $('#commits_div').append(`
        <table class="table">
            <thead>
                <th scope="col">SHA</th>
                <th scope="col">Timestamp</th>
                <th scope="col">Commiter</th>
                <th scope="col">Commit Message</th>
            </thead>
            <tbody id="commit_table">
            </tbody>
        </table>
    `)
    for (var i = 0; i < data.length; i++) {
        $('#commit_table').append(`
            <tr>
                <td><a href="${data[i].Html_Url}">${data[i].Sha.substring(0, 6)}</a></td>
                <td>${data[i].Commit.Author.Date}</td>
                <td>${data[i].Commit.Author.Name}</td>
                <td>${data[i].Commit.Message}</td>
            </tr>
        `)
    }
}

function getDate(upDate) {
    var date = new Date(upDate);
    var dt = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    var updated = month + "/" + dt + "/" + year;

    var today = new Date();
    var dt2 = String(today.getDate()).padStart(2, '0');
    var month2 = String(today.getMonth() + 1).padStart(2, '0');
    var year2 = today.getFullYear();
    var today = month2 + '/' + dt2 + '/' + year2;

    var date1 = new Date(updated);
    var date2 = new Date(today);

    var diffInTime = date2.getTime() - date1.getTime();
    var diffInDays = diffInTime / (1000 * 3600 * 24);

    return Math.round(diffInDays);
}