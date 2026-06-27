# PowerShell demo script for BugSalyers backend

$base = 'http://localhost:8000'

Write-Host "Creating diagnostic..."
$create = Invoke-RestMethod -Method Post -Uri "$base/api/v1/diagnostics" -Body (@{company_name='Acme S.A.'} | ConvertTo-Json) -ContentType 'application/json'
$diag = $create.diagnostic_id
Write-Host "Diagnostic created: $diag"

Write-Host "Submitting answers..."
$answers = @{answers = @(
    @{question_id='consent'; answer=2},
    @{question_id='security'; answer=1},
    @{question_id='retention'; answer=0}
)} | ConvertTo-Json
Invoke-RestMethod -Method Post -Uri "$base/api/v1/diagnostics/$diag/answers" -Body $answers -ContentType 'application/json'

Write-Host "Fetching result..."
$res = Invoke-RestMethod -Method Get -Uri "$base/api/v1/diagnostics/$diag"
$res | ConvertTo-Json -Depth 5 | Write-Host

Write-Host "Requesting recommendations..."
$rec = Invoke-RestMethod -Method Post -Uri "$base/api/v1/diagnostics/$diag/recommendations"
$rec | ConvertTo-Json -Depth 5 | Write-Host
