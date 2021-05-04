<%@ page import="com.example.rsSchool.models.Education" %>
<%@ page import="java.util.List" %>
<%@ page import="com.example.rsSchool.controllers.EducationController" %><%--
  Created by IntelliJ IDEA.
  User: almaani
  Date: 04/05/2021
  Time: 00:03
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    List<Education> edus = EducationController.fetchAll();
%>
<html>
<head>
    <title>Educations</title>
</head>
<body>
<h1>Educations</h1>
<form></form>
<table>
    <thead>
    <td>id</td>
    <td>name</td>
    <td>description</td>
    </thead>
    <tbody>

    <% for (Education c : edus) {%>
    <tr>
        <td><%c.getId();%></td>
        <td><%c.getName();%></td>
        <td><%c.getDescription();%></td>
    </tr>
    </tbody>
<% } %>
</table>
</body>
</html>
