export const JsonToCsv = ({ JSONData, Filename, ColumnDataTypes, ShowLabel }: any) => {
    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
    var array = ColumnDataTypes.split(',');
    var CSV = '';
    var ColumnName = ColumnDataTypes.split(',');
    if (ShowLabel) {
        var row:any = "";
        for (var x = 0; x < array.length; x++) {
            row += array[x].split('-')[1] + ',';
        }
    }
    row = row.slice(0, -1);
    //append Label row with line break
    CSV += row + '\r\n';
    for (var i = 0; i < arrData.length; i++) {
        var row:any = "";

        for (let Col = 0; Col < array.length; Col++) {
            row += ('"' + arrData[i][array[Col].split('-')[0]] + '",').replace('""', '"');
        }
        row.slice(0, row.length - 1);
        //add a line break after each row
        CSV += row + '\r\n';
    }

    if (CSV === '') {
        alert("Invalid data");
        return;
    }

    //Generate a file name
    var fileName = Filename;

    //Initialize file format you want csv or xls
    var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
    var link:any = document.createElement("a");
    link.href = uri;
    //set the visibility hidden so it will not effect on your web-layout
    link.style = "visibility:hidden";
    link.download = fileName + ".csv";
    //this part will append the anchor tag and remove it after automatic click
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};