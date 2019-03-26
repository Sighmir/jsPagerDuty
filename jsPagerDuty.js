if (!isNode) {
    function isNode() {
        return typeof module !== 'undefined' && module.exports
    }
}

if (!ExtendableProxy) {
    class ExtendableProxy {
        constructor(getset = {}) {
            return new Proxy(this, getset);
        }
    }
}

class PagerDutyAPI extends ExtendableProxy {
    constructor(email,token) {
        super({
            get: function (pdapi, func) {
                if (pdapi[func] != null) return pdapi[func]
                return function (...params) { return pdapi.perform(func, ...params) }
            }
        })
        this.url = 'https://api.pagerduty.com/'
        this.headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/vnd.pagerduty+json;version=2',
            'Authorization': 'Token token='+token,
            'From': email
        }
    }

    send(method, path, params) {
        var self = this
        return new Promise(function (resolve, reject) {
            var request = false
            if (isNode()) {
                request = require('xmlhttprequest').XMLHttpRequest
            } else {
                request = XMLHttpRequest
            }
            if (request) {
                var http_request = new request()
                http_request.open(method, self.url+path, true)
                for (var h in self.headers) {
                    http_request.setRequestHeader(h, self.headers[h])
                }
                http_request.send(JSON.stringify(params));
                http_request.onreadystatechange = function () {
                    if (http_request.readyState == 4) {
                        resolve(JSON.parse(http_request.responseText))
                    }
                }
            } else {
                reject('There was a problem importing the XMLHttpRequest class.')
            }
        })
    }

    perform(action, ...params) {
        const method = {
            // Abilities
            listAbilities: [`GET`, `abilities`],
            testAbility: [`GET`, `abilities/${params[0]}`],
            // Addons
            listAddons: [`GET`, `addons?${this.serialize(params[0])}`],
            installAddon: [`POST`, `addons`, params[0]],
            deleteAddon: [`DELETE`, `addons/${params[0]}`],
            getAddon: [`GET`, `addons/${params[0]}`],
            updateAddon: [`PUT`, `addons/${params[0]}`, params[1]],
            // Escalation Policies
            listEscalationPolicies: [`GET`, `escalation_policies?${this.serialize(params[0])}`],
            createEscalationPolicy: [`POST`, `escalation_policies`, params[0]],
            deleteEscalationPolicy: [`DELETE`, `escalation_policies/${params[0]}`],
            getEscalationPolicy: [`GET`, `escalation_policies/${params[0]}?${this.serialize(params[1])}`],
            updateEscalationPolicy: [`PUT`, `escalation_policies/${params[0]}`, params[1]],
            // Extension Schemas
            listExtensionSchemas: [`GET`, `extension_schemas`],
            getExtensionVendor: [`GET`, `extension_schemas/${params[0]}`],
            // Extensions
            listExtensions: [`GET`, `extensions?${this.serialize(params[0])}`],
            createExtension: [`POST`, `extensions`, params[0]],
            deleteExtension: [`DELETE`, `extensions/${params[0]}`],
            getExtension: [`GET`, `extensions/${params[0]}?${this.serialize(params[1])}`],
            updateExtension: [`PUT`, `extensions/${params[0]}`, params[1]],
            // Incidents
            listIncidents: [`GET`, `incidents?${this.serialize(params[0])}`],
            createIncident: [`POST`, `incidents`, params[0]],
            manageIncidents: [`PUT`, `incidents`, params[0]],
            mergeIncidents: [`PUT`, `incidents/${params[0]}/merge`, params[1]],
            getIncident: [`GET`, `incidents/${params[0]}`],
            updateIncident: [`PUT`, `incidents/${params[0]}`, params[1]],
            listIncidentAlerts: [`GET`, `incidents/${params[0]}/alerts?${this.serialize(params[1])}`],
            manageIncidentAlerts: [`PUT`, `incidents/${params[0]}/alerts`, params[1]],
            getIncidentAlert: [`GET`, `incidents/${params[0]}/alerts/${params[1]}`],
            updateIncidentAlert: [`PUT`, `incidents/${params[0]}}/alerts/${params[1]}`, params[2]],
            listIncidentLogEntries: [`GET`, `incidents/${params[0]}/log_entries?${this.serialize(params[1])}`],
            listIncidentNotes: [`GET`, `incidents/${params[0]}/notes`],
            createIncidentNote: [`POST`, `incidents/${params[0]}/notes`, params[1]],
            createIncidentStatusUpdate: [`POST`, `incidents/${params[0]}/status_updates`, params[1]],
            createIncidentResponderRequest: [`POST`, `incidents/${params[0]}/responder_requests`, params[1]],
            snoozeIncident: [`POST`, `incidents/${params[0]}/snooze`, params[1]],
            // Priorities
            listPriorities: [`GET`, `priorities`],
            // Response Plays
            runResponsePlay: [`POST`, `response_plays/${params[0]}/run`, params[1]],
            // Log Entries
            listLogEntries: [`GET`, `log_entries?${this.serialize(params[0])}`],
            getLogEntry: [`GET`, `log_entries/${params[0]}?${this.serialize(params[1])}`],
            // Maintenance Windows
            listMaintenanceWindows: [`GET`, `maintenance_windows?${this.serialize(params[0])}`],
            createMaintenanceWindow: [`POST`, `maintenance_windows`, params[0]],
            deleteMaintenanceWindow: [`DELETE`, `maintenance_windows/${params[0]}`],
            getMaintenanceWindow: [`GET`, `maintenance_windows/${params[0]}?${this.serialize(params[1])}`],
            updateMaintenanceWindow: [`PUT`, `maintenance_windows/${params[0]}`, params[1]],
            // Notifications
            listNotifications: [`GET`, `notifications?${this.serialize(params[0])}`],
            // OnCalls
            listOnCalls: [`GET`, `oncalls?${this.serialize(params[0])}`],
            // Schedules
            listSchedules: [`GET`, `schedules?${this.serialize(params[0])}`],
            createSchedule: [`POST`, `schedules?overflow=${params[1] || false}`, params[0]],
            previewSchedule: [`POST`, `schedules?${this.serialize(params[0])}`, params[1]],
            deleteSchedule: [`DELETE`, `schedules/${params[0]}`],
            getSchedule: [`GET`, `schedules/${params[0]}?${this.serialize(params[1])}`],
            updateSchedule: [`PUT`, `schedules/${params[0]}?overflow=${params[2] || false}`, params[1]],
            listScheduleOverrides: [`GET`, `schedules/${params[0]}/overrides?${this.serialize(params[1])}`],
            createScheduleOverride: [`POST`, `schedules/${params[0]}/overrides`, params[1]],
            deleteScheduleOverride: [`DELETE`, `schedules/${params[0]}/overrides/${params[1]}`],
            listScheduleUsers: [`GET`, `schedules/${params[0]}/users?${this.serialize(params[1])}`],
            // Services
            listServices: [`GET`, `services?${this.serialize(params[0])}`],
            createService: [`POST`, `services`, params[0]],
            deleteService: [`DELETE`, `services/${params[0]}`],
            getService: [`GET`, `services/${params[0]}?${this.serialize(params[1])}`],
            updateService: [`PUT`, `services/${params[0]}`, params[1]],
            createServiceIntegration: [`POST`, `services/${params[0]}/integrations`, params[1]],
            viewServiceIntegration: [`GET`, `services/${params[0]}/integrations/${params[1]}?${this.serialize(params[2])}`],
            updateServiceIntegration: [`PUT`, `services/${params[0]}/integrations/${params[1]}`, params[2]],
            // Teams
            listTeams: [`GET`, `teams?${this.serialize(params[0])}`],
            createTeam: [`POST`, `teams`, params[0]],
            deleteTeam: [`DELETE`, `teams/${params[0]}`],
            getTeam: [`GET`, `teams/${params[0]}`],
            updateTeam: [`PUT`, `teams/${params[0]}`, params[1]],
            removeTeamEscalationPolicy: [`DELETE`, `teams/${params[0]}/escalation_policies/${params[1]}`],
            addTeamEscalationPolicy: [`PUT`, `teams/${params[0]}/escalation_policies/${params[1]}`],
            removeTeamUser: [`DELETE`, `teams/${params[0]}/users/${params[1]}`],
            addTeamUser: [`PUT`, `teams/${params[0]}/users/${params[1]}`],
            // Users
            listUsers: [`GET`, `users?${this.serialize(params[0])}`],
            createUser: [`POST`, `users`, params[0]],
            deleteUser: [`DELETE`, `users/${params[0]}`],
            getUser: [`GET`, `users/${params[0]}?${this.serialize(params[1])}`],
            updateUser: [`PUT`, `users/${params[0]}`, params[1]],
            getCurrentUser: [`GET`, `users/me`],
            listUserContactMethods: [`GET`, `users/${params[0]}/contact_methods`],
            createUserContactMethod: [`POST`, `users/${params[0]}/contact_methods`, params[1]],
            deleteUserContactMethod: [`DELETE`, `users/${params[0]}/contact_methods/${params[1]}`],
            getUserContactMethod: [`GET`, `users/${params[0]}/contact_methods/${params[1]}`],
            updateUserContactMethod: [`PUT`, `users/${params[0]}/contact_methods/${params[1]}`, params[2]],
            listUserNotificationRules: [`GET`, `users/${params[0]}/notification_rules?${this.serialize(params[1])}`],
            createUserNotificationRule: [`POST`, `users/${params[0]}/notification_rules`, params[1]],
            deleteUserNotificationRule: [`DELETE`, `users/${params[0]}/notification_rules/${params[1]}`],
            getUserNotificationRule: [`GET`, `users/${params[0]}/notification_rules/${params[1]}?${this.serialize(params[2])}`],
            updateUserNotificationRule: [`PUT`, `users/${params[0]}/notification_rules/${params[1]}`, params[2]],
            // Vendors
            listVendors: [`GET`, `vendors`],
            getVendors: [`GET`, `vendors/${params[0]}`],
        }

        if (method[action] == undefined) {
            console.log('Unknown method.')
            return
        }

        return this.send(...method[action])
    }

    setRequestHeader(header, value) {
        self.headers[header] = value
    }

    serialize(obj) {
        var str = []
        for (var p in obj)
            if (obj.hasOwnProperty(p)) {
                if (obj[p].constructor.name == 'Array') {
                    str.push(encodeURIComponent(p+'[]') + '=' + encodeURIComponent(obj[p]))
                } else {
                    str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]))
                }
            }
        return str.join("&")
    }
}

if (isNode()) {
    module.exports = PagerDutyAPI
}