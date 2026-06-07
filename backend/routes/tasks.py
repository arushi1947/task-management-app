from flask import Blueprint, request, jsonify
from supabase_client import supabase

tasks_bp = Blueprint("tasks", __name__)

@tasks_bp.route("/tasks", methods=["POST"])
def create_task():

    data = request.json

    response = supabase.table("tasks").insert({
        "title": data["title"],
        "description": data["description"],
        "assigned_to": data["assigned_to"],
        "created_by": data["created_by"]
    }).execute()

    return jsonify(response.data)
@tasks_bp.route("/tasks", methods=["GET"])
def get_tasks():

    response = supabase.table("tasks").select(
        "*, assigned_user:assigned_to(email,name)"
    ).execute()

    return jsonify(response.data)

@tasks_bp.route("/tasks/<task_id>", methods=["PUT"])
def update_task(task_id):

    data = request.json

    response = supabase.table("tasks").update({
        "status": data["status"]
    }).eq("id", task_id).execute()

    return jsonify(response.data)

@tasks_bp.route("/tasks/<task_id>", methods=["DELETE"])
def delete_task(task_id):

    response = supabase.table("tasks") \
        .delete() \
        .eq("id", task_id) \
        .execute()

    return jsonify({
        "message": "Task deleted successfully"
    })

@tasks_bp.route("/users", methods=["GET"])
def get_users():

    response = supabase.table("users") \
        .select("*") \
        .execute()

    return jsonify(response.data)