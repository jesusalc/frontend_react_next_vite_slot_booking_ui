curl -X POST "http://localhost:3000/api/v1/available_slots" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{"slot": {"date": "2022-02-01", "duration": "1"}}'