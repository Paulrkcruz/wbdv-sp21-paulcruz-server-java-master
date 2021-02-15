// First Easy part:
// alert("welcome")
// var myHeader = jQuery("h1")
// myHeader.remove()
// myHeader
//     .html("User Admin No Way!!")
//     .append(" - add/remove user")
//     .prepend("Welcome to the ")
//     .css("background-color", "red")
//     .click(function () {
//     alert("Header was clicked!!!")
//     })
// myHeader.click(function (event) {
//     console.log(event.target)
//     var h1 = jQuery(event.target)
//     h1.css("background-color", "green")
// })

// Second add table row by append:
// var tableRows = jQuery("#table-rows")
// tableRows.remove()
// tableRows.append("<tr>\n" +
//     "            <td>tlee</td>\n" +
//     "            <td></td>\n" +
//     "            <td>Tim</td>\n" +
//     "            <td>Birns Lee</td>\n" +
//     "            <td>FACULTY</td>\n" +
//     "            <td>\n" +
//     "                <button>Delete</button>\n" +
//     "                <button>Edit</button>\n" +
//     "            </td>\n" +
//     "        </tr>")

// Third call function:
// function renderUsers () {
// for (var i = 0; i < 5; i++) {
// tableRows.prepend(`<tr>
//             <td>tlee</td>
//             <td></td>
//             <td>Tim</td>
//             <td>Birns Lee</td>
//             <td>FACULTY</td>
//             <td>
//                 <button>Delete</button>
//                 <button>Edit</button>
//             </td>
//         </tr>`)
// }}
// renderUsers()

// Add "user.service.client.js" action
var userServices = new AdminUserServiceClient()
// userServices.findAllUsers()
// End "user.service.client.js" action

var $tableRows

var $wbdvusername
var $wbdvpassword
var $wbdvfirstname
var $wbdvlastname
var $wbdvrole

var users = [
    {uausername: "aa", uapassword: "", uafirstname: "bb", ualastname: "cc", role: "Faculty"},
    {uausername: "dd", uapassword: "", uafirstname: "ee", ualastname: "ff", role: "Student"},
    {uausername: "gg", uapassword: "", uafirstname: "hh", ualastname: "ii", role: "Admin"}
]

function deleteUser(event) {
    alert("User removed!")
    var button = $(event.target)
    var index = button.attr("id")
    var id = users[index]._id
    userServices.deleteUser(id)
        .then(function (status) {
            users.splice(index, 1)
            renderUsers(users)
        })
    // users.splice(id, 1)
    // renderUsers(users)
}

var $createBtn
// var createBtn = $(".webdv-create-btn")
// createBtn.click(function () {
//     //alert("create user")
//     var newUser = {
//         uausername: "NEW USERNAME",
//         uapassword: "NEW PASSWORD",
//         uafirstname: "NEW FIRST NAME",
//         ualastname: "NEW LAST NAME",
//         role: "NEW ROLE"
//     }
//     users.push(newUser)
//     renderUsers(users)
// })
function createUser() {
    alert("New User Created!")
    var newUser = {
        uausername: $wbdvusername.val(),
        uapassword: $wbdvpassword.val(),
        uafirstname: $wbdvfirstname.val(),
        ualastname: $wbdvlastname.val(),
        role: $wbdvrole.val()
    }
    userServices.createUser(newUser).then(function (actualUser) {
        users.push(actualUser)
        renderUsers(users)
    })
    // users.push(newUser)
    // renderUsers(users)
}

var selectedUser = null
function editUser(event) {
    var id = $(event.target).attr("id")
    // console.log(id)
    selectedUser = users.find(user => user._id === id)
    $wbdvusername.val(selectedUser.uausername)
    $wbdvpassword.val(selectedUser.uapassword)
    $wbdvfirstname.val(selectedUser.uafirstname)
    $wbdvlastname.val(selectedUser.ualastname)
    $wbdvrole.val(selectedUser.role)
}

var $updateBtn

function updateUser() {
    selectedUser.uausername = $wbdvusername.val()
    selectedUser.uapassword = $wbdvpassword.val()
    selectedUser.uafirstname = $wbdvfirstname.val()
    selectedUser.ualastname = $wbdvlastname.val()
    selectedUser.role = $wbdvrole.val()
    userServices.updateUser(selectedUser._id, selectedUser)
        .then(status => {
            var index = users.findIndex(user => user._id === selectedUser._id)
            users[index] = selectedUser
            renderUsers(users)
        })
}

// Fourth ugly design:
function renderUsers (users) {
    $tableRows.empty()
    for (var i = 0; i < users.length; i++) {
        var user = users[i]
        $tableRows.prepend(`<tr>
            <td>${user.uausername}</td>
            <td>${user.uapassword}</td>
            <td>${user.uafirstname}</td>
            <td>${user.ualastname}</td>
            <td>${user.role}</td>
            <td></td>
            <td>
                <i id="${i}" class="cms-delete-btn fas fa-trash-alt fa-lg"></i>
                <i id="${user._id}" class="cms-edit-btn fas fa-pencil-alt fa-lg"></i>
            </td>
        </tr>`)
    }
    $(".cms-delete-btn").click(deleteUser)
    $(".cms-edit-btn").click(editUser)
    //     function (event) {
    //     alert("delete user")
    //     var button = $(event.target)
    //     var index = button.attr("id")
    //     var id = users[index]._id
    //     userServices.deleteUser(id).then(function (status) {
    //         users.splice(id, 1)
    //         renderUsers(users)
    //     })
    //     // users.splice(id, 1)
    //     // renderUsers(users)
    // })
}
// renderUsers(users)

// Fifth Nicely design
function main(){
    $tableRows = jQuery("#table-rows")
    $createBtn = $(".webdv-create-btn")
    $createBtn.click(createUser)
    $updateBtn = $(".webdv-update-btn")
    $updateBtn.click(updateUser)
    $wbdvusername = $(".wbdv-username")
    $wbdvpassword = $(".wbdv-password")
    $wbdvfirstname = $(".wbdv-firstname")
    $wbdvlastname = $(".wbdv-lastname")
    $wbdvrole = $(".wbdv-role")
    //     function () {
    //     alert("create user")
    //     var newUser = {
    //         uausername: "NEW USERNAME",
    //         uapassword: "NEW PASSWORD",
    //         uafirstname: "NEW FIRST NAME",
    //         ualastname: "NEW LAST NAME",
    //         role: "NEW ROLE"
    //     }
    //     users.push(newUser)
    //     renderUsers(users)
    // })

    // Add "user.service.client.js" action
    userServices.findAllUsers().then(function (actualUser) {
        users = actualUser
        renderUsers(users)
    })

}
$(main)