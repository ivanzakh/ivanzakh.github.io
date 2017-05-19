drop table test_table;
create table test_table (
	Name varchar primary key,
	Numbers numeric,
	Dates date,
	Unsortable varchar
);
insert into test_table values
	('abc', 20,  '2008-11-24', 'This'),
	('dba', 8,   '2004-03-01', 'column'),
	('ecd', 6,   '1979-07-23', 'cannot'),
	('cut', 4.2, '1492-12-08', 'be'),
	('001', 0,   '1601-08-13', 'sorted.'),
	('eof', 2,   '1979-07-23', 'Never.');