<?php
pg_connect("host=localhost port=5432 dbname=test user=postgres password=1");

$query = "select * from test_table";

$result = pg_query($query);
$resultArray = array();
while ($row = pg_fetch_row($result)) {
  $resultArray[] = $row;
}
#print_r($resultArray);

$js_obj = json_encode($resultArray);
#print_r($js_obj);

pg_close();
?>

<script type="text/javascript">
	const database = <?php echo $resultArray;?>;	
</script>
