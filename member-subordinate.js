function searchMember() {
    const memberId = document.getElementById('memberIdInput').value;
    fetchMemberData(memberId);
}

function searchByPhone() {
    const phone = document.getElementById('phoneNumberInput').value;
    fetch(`api/member/data/by-phone/${phone}`)
    .then(response => response.json())
    .then(data => updateMemberDetails(data))
    .catch(error => console.error('Error fetching member by phone:', error));
}

function fetchMemberData(memberId) {
    fetch(`api/member/data/${memberId}`)
    .then(response => response.json())
    .then(data => {
        updateMemberDetails(data);
        fillSubordinateTable(data.subordinates);
    })
    .catch(error => console.error('Error fetching member data:', error));
}

function updateMemberDetails(data) {
    document.getElementById('memberId').textContent = data.memberId;
    document.getElementById('superiorId').textContent = data.superiorId;
    document.getElementById('subordinateCount').textContent = data.subordinateCount;
    document.getElementById('lastLogin').textContent = data.lastLogin;
}

function fillSubordinateTable(subordinates) {
    const tableBody = document.getElementById('subordinatesTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = ''; // Clear existing rows
    subordinates.forEach(sub => {
        let row = tableBody.insertRow();
        row.insertCell(0).textContent = sub.memberId;
        row.insertCell(1).textContent = sub.superiorId;
        row.insertCell(2).textContent = sub.relativeLevel;
        row.insertCell(3).textContent = sub.bankAccount;
        row.insertCell(4).textContent = sub.deposit;
        row.insertCell(5).textContent = sub.withdrawals;
        row.insertCell(6).textContent = sub.balance;
        row.insertCell(7).textContent = sub.lastLogin;
        row.insertCell(8).textContent = sub.joiningDate;
    });
}

function showBanPopup() {
    // Implementation for showing a popup to confirm the ban or provide reasons
    alert("Implement ban functionality here.");
}

document.addEventListener('DOMContentLoaded', () => {
    // Initial actions if needed
});
