let currentPage = 1;
let rowsPerPage = 10; // Default number of rows

function updateTableDisplay(members) {
    const table = document.getElementById('memberCredentialsData');
    const startRow = (currentPage - 1) * rowsPerPage;
    const endRow = rowsPerPage === 'all' ? members.length : startRow + rowsPerPage;

    table.innerHTML = ''; // Clear existing table rows

    // Populate table with the correct slice of member data
    members.slice(startRow, endRow).forEach(member => {
        const row = table.insertRow();
        row.insertCell(0).textContent = member.memberId;
        row.insertCell(1).textContent = member.superiorId;
        row.insertCell(1).textContent = member.relativeLevel;
        row.insertCell(2).textContent = member.phoneNumber;
        row.insertCell(3).textContent = member.username;
        row.insertCell(4).textContent = member.password; // Consider masking or encrypting if shown
        row.insertCell(5).textContent = member.ipAddress;
        row.insertCell(5).textContent = member.device;
        row.insertCell(6).textContent = member.bankAccount;
        row.insertCell(7).textContent = member.joiningDate;
        row.insertCell(8).textContent = member.lastLogin;
        row.insertCell(8).textContent = member.status;
        row.insertCell(9).textContent = member.deposits;
        row.insertCell(10).textContent = member.withdrawals;
    });

    // Update row information display
    document.getElementById('rowInfo').textContent = `Showing ${Math.min(startRow + 1, members.length)} to ${Math.min(endRow, members.length)} of ${members.length} entries`;
}

function changeRowsPerPage() {
    const select = document.getElementById('rowsPerPage');
    rowsPerPage = select.value === 'all' ? 'all' : parseInt(select.value);
    currentPage = 1; // Reset to first page
    fetchAllMembers(); // Fetch all members with new row settings
}

function fetchAllMembers() {
    // API call to fetch all member credentials
    fetch('api/member/credentials') // Adjust the endpoint as necessary
        .then(response => response.json())
        .then(data => {
            updateTableDisplay(data); // Update table with all fetched data
        })
        .catch(error => console.error('Error fetching member credentials:', error));
}

document.addEventListener('DOMContentLoaded', () => {
    fetchAllMembers(); // Fetch and display all member credentials when the page loads
});



/* Memberscredentils modal popup */

var modal = document.getElementById("memberDetailsModal");
var span = document.getElementsByClassName("close")[0];

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function showMemberDetails(memberId) {
    fetch(`api/member/details/${memberId}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('detailMemberID').textContent = data.memberId;
            document.getElementById('detailUserBalance').textContent = data.userBalance;
            document.getElementById('detailAccumulatedRecharge').textContent = data.accumulatedRecharge;
            // Set textContent for other spans as needed
            modal.style.display = "block";
        })
        .catch(error => console.error('Error fetching member details:', error));
}

// Example of how to hook this up on a page
document.querySelectorAll('.member-id').forEach(item => {
    item.onclick = () => showMemberDetails(item.textContent);
});